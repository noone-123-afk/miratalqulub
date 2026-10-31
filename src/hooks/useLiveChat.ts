import { useState, useEffect, useRef, useCallback } from 'react';
import { UserProfile } from '../types';
import { soundManager } from '../utils/sound';

export interface ChatMessageItem {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export interface MatchedPartner {
  id: string;
  userName: string;
  userGender: 'male' | 'female';
  userAge: number;
  country: string;
  ethnicity: string;
  educationLevel?: string;
  lifestyleOutlook?: string;
}

export function useLiveChat(profile: UserProfile | null) {
  const [isConnected, setIsConnected] = useState(false);
  const [myUserId, setMyUserId] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'in_chat'>('idle');
  const [partner, setPartner] = useState<MatchedPartner | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [compatibilityScore, setCompatibilityScore] = useState<number>(95);
  const [compatibilityReason, setCompatibilityReason] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [partnerIsTyping, setPartnerIsTyping] = useState<boolean>(false);
  const [partnerLeftMessage, setPartnerLeftMessage] = useState<string | null>(null);
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [searchingCount, setSearchingCount] = useState<number>(0);
  const [isRealPerson, setIsRealPerson] = useState<boolean>(false);
  const [privateRoomCode, setPrivateRoomCode] = useState<string | null>(null);
  const [roomErrorMessage, setRoomErrorMessage] = useState<string | null>(null);
  const [latestBlindDateEvent, setLatestBlindDateEvent] = useState<{
    event: string;
    data: any;
    senderId: string;
    timestamp: number;
  } | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or connect WebSocket
  const connect = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws-chat`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        // Register current profile if available
        if (profile) {
          ws.send(
            JSON.stringify({
              type: 'register_profile',
              profile: {
                userName: profile.userName,
                userGender: profile.userGender,
                partnerGender: profile.partnerGender,
                userAge: profile.userAge,
                country: profile.country,
                ethnicity: profile.ethnicity,
                educationLevel: profile.educationLevel,
                lifestyleOutlook: profile.lifestyleOutlook,
                userBirthDate: profile.userBirthDate,
              },
            })
          );
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'connected') {
            setMyUserId(data.userId);
            if (data.onlineCount) setOnlineCount(data.onlineCount);
          } else if (data.type === 'stats_update') {
            if (data.onlineCount !== undefined) setOnlineCount(data.onlineCount);
            if (data.searchingCount !== undefined) setSearchingCount(data.searchingCount);
          } else if (data.type === 'searching') {
            setStatus('searching');
            setPartnerLeftMessage(null);
          } else if (data.type === 'matched') {
            setStatus('in_chat');
            setRoomId(data.roomId);
            setPartner(data.partner);
            setIsRealPerson(!!data.isRealPerson);
            setCompatibilityScore(data.compatibilityScore || 96);
            setCompatibilityReason(data.compatibilityReason || 'تطابق في المواصفات والاهتمامات المشتركة');
            setMessages([]);
            setPartnerLeftMessage(null);
            setRoomErrorMessage(null);
            soundManager.playResultReveal();
          } else if (data.type === 'private_room_created') {
            setPrivateRoomCode(data.code);
            setStatus('searching');
            setRoomErrorMessage(null);
            soundManager.playTap();
          } else if (data.type === 'room_error') {
            setRoomErrorMessage(data.message);
            setStatus('idle');
          } else if (data.type === 'chat_message') {
            setMessages((prev) => [...prev, data.message]);
            soundManager.playTap();
          } else if (data.type === 'partner_typing') {
            setPartnerIsTyping(!!data.isTyping);
          } else if (data.type === 'blind_date_event') {
            setLatestBlindDateEvent({
              event: data.event,
              data: data.data,
              senderId: data.senderId,
              timestamp: Date.now(),
            });
          } else if (data.type === 'partner_left') {
            setPartnerLeftMessage(data.message || 'غادر الطرف الآخر المحادثة');
            setPartnerIsTyping(false);
            setIsRealPerson(false);
            setStatus('idle');
            setRoomId(null);
          }
        } catch (e) {
          console.warn('WS message parsing error:', e);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        wsRef.current = null;
        // Auto-reconnect after 3 seconds
        if (!reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            connect();
          }, 3000);
        }
      };

      ws.onerror = () => {
        setIsConnected(false);
      };
    } catch (e) {
      console.warn('WebSocket connection error:', e);
    }
  }, [profile]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  // Sync profile when profile state updates
  useEffect(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && profile) {
      wsRef.current.send(
        JSON.stringify({
          type: 'register_profile',
          profile: {
            userName: profile.userName,
            userGender: profile.userGender,
            partnerGender: profile.partnerGender,
            userAge: profile.userAge,
            country: profile.country,
            ethnicity: profile.ethnicity,
            educationLevel: profile.educationLevel,
            lifestyleOutlook: profile.lifestyleOutlook,
            userBirthDate: profile.userBirthDate,
          },
        })
      );
    }
  }, [profile]);

  const startSearch = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      connect();
    }
    soundManager.playTap();
    setStatus('searching');
    setPartnerLeftMessage(null);
    setPartner(null);
    setMessages([]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'start_search',
          profile: profile
            ? {
                userName: profile.userName,
                userGender: profile.userGender,
                partnerGender: profile.partnerGender,
                userAge: profile.userAge,
                country: profile.country,
                ethnicity: profile.ethnicity,
                educationLevel: profile.educationLevel,
                lifestyleOutlook: profile.lifestyleOutlook,
                userBirthDate: profile.userBirthDate,
              }
            : undefined,
        })
      );
    }
  }, [connect, profile]);

  const cancelSearch = useCallback(() => {
    soundManager.playTap();
    setStatus('idle');
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'cancel_search' }));
    }
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean || !roomId) return;
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'send_message',
            roomId,
            text: clean,
          })
        );
      }
    },
    [roomId]
  );

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      if (!roomId) return;
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'typing',
            roomId,
            isTyping,
          })
        );
      }
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          sendTyping(false);
        }, 2000);
      }
    },
    [roomId]
  );

  const leaveChat = useCallback(() => {
    soundManager.playTap();
    if (roomId && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'leave_chat',
          roomId,
        })
      );
    }
    setStatus('idle');
    setPartner(null);
    setRoomId(null);
    setMessages([]);
    setPartnerIsTyping(false);
  }, [roomId]);

  const sendBlindDateEvent = useCallback(
    (event: string, data: any) => {
      if (roomId && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'blind_date_event',
            roomId,
            event,
            data,
          })
        );
      }
    },
    [roomId]
  );

  const createPrivateRoom = useCallback(
    (customCode?: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        connect();
      }
      soundManager.playTap();
      setRoomErrorMessage(null);
      setStatus('searching');
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'create_private_room',
            code: customCode,
          })
        );
      }
    },
    [connect]
  );

  const joinPrivateRoom = useCallback(
    (code: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        connect();
      }
      soundManager.playTap();
      setRoomErrorMessage(null);
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'join_private_room',
            code,
          })
        );
      }
    },
    [connect]
  );

  return {
    isConnected,
    myUserId,
    status,
    partner,
    roomId,
    compatibilityScore,
    compatibilityReason,
    messages,
    partnerIsTyping,
    partnerLeftMessage,
    onlineCount,
    searchingCount,
    isRealPerson,
    privateRoomCode,
    roomErrorMessage,
    latestBlindDateEvent,
    startSearch,
    cancelSearch,
    sendMessage,
    sendTyping,
    leaveChat,
    sendBlindDateEvent,
    createPrivateRoom,
    joinPrivateRoom,
  };
}
