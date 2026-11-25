import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useLanguage } from './LanguageContext';

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  status?: 'streaming' | 'complete' | 'error';
}

export interface ChatConversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

interface AIChatState {
  isOpen: boolean;
  isStreaming: boolean;
  error: string | null;
  activeConversationId: string;
  conversations: ChatConversation[];
}

type AIChatAction =
  | { type: 'SET_OPEN'; isOpen: boolean }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'CREATE_CONVERSATION'; conversation: ChatConversation }
  | { type: 'SELECT_CONVERSATION'; conversationId: string }
  | { type: 'DELETE_CONVERSATION'; conversationId: string }
  | { type: 'CLEAR_HISTORY'; freshConversation: ChatConversation }
  | { type: 'ADD_USER_MESSAGE'; conversationId: string; message: ChatMessage; title?: string }
  | { type: 'START_ASSISTANT_MESSAGE'; conversationId: string; message: ChatMessage }
  | { type: 'APPEND_ASSISTANT_CHUNK'; conversationId: string; messageId: string; chunk: string }
  | {
      type: 'FINISH_ASSISTANT_MESSAGE';
      conversationId: string;
      messageId: string;
      finalContent?: string;
    }
  | {
      type: 'FAIL_ASSISTANT_MESSAGE';
      conversationId: string;
      messageId: string;
      error: string;
      errorContent: string;
    }
  | { type: 'SET_ERROR'; error: string | null };

const STORAGE_KEY = 'mirat_ai_chat_history_v1';
const MAX_STORED_CONVERSATIONS = 25;
const MAX_MESSAGES_PER_CONVERSATION = 80;

function createUid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function createEmptyConversation(language: 'ar' | 'en' = 'ar'): ChatConversation {
  const now = Date.now();
  return {
    id: createUid('conv'),
    title: language === 'ar' ? 'محادثة جديدة' : 'New conversation',
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

function deriveTitleFromPrompt(prompt: string): string {
  const clean = prompt.replace(/\s+/g, ' ').trim();
  if (!clean) return 'محادثة جديدة';
  return clean.length > 48 ? `${clean.slice(0, 48)}…` : clean;
}

function loadInitialState(): AIChatState {
  const fallbackConv = createEmptyConversation('ar');
  if (typeof window === 'undefined') {
    return {
      isOpen: false,
      isStreaming: false,
      error: null,
      activeConversationId: fallbackConv.id,
      conversations: [fallbackConv],
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.conversations) &&
        parsed.conversations.length > 0
      ) {
        const sanitized: ChatConversation[] = parsed.conversations
          .slice(0, MAX_STORED_CONVERSATIONS)
          .filter((c: any) => c && typeof c.id === 'string' && Array.isArray(c.messages))
          .map((c: any) => ({
            id: c.id,
            title: typeof c.title === 'string' && c.title.trim() ? c.title : 'محادثة سابقة',
            createdAt: typeof c.createdAt === 'number' ? c.createdAt : Date.now(),
            updatedAt: typeof c.updatedAt === 'number' ? c.updatedAt : Date.now(),
            messages: c.messages
              .slice(-MAX_MESSAGES_PER_CONVERSATION)
              .filter(
                (m: any) =>
                  m &&
                  typeof m.id === 'string' &&
                  (m.role === 'user' || m.role === 'assistant') &&
                  typeof m.content === 'string'
              )
              .map((m: any) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                createdAt: typeof m.createdAt === 'number' ? m.createdAt : Date.now(),
                status: m.status === 'streaming' ? 'complete' : m.status || 'complete',
              })),
          }));

        if (sanitized.length > 0) {
          const activeExists = sanitized.some((c) => c.id === parsed.activeConversationId);
          return {
            isOpen: false,
            isStreaming: false,
            error: null,
            activeConversationId: activeExists
              ? parsed.activeConversationId
              : sanitized[0].id,
            conversations: sanitized,
          };
        }
      }
    }
  } catch {
    // Ignore storage read errors
  }

  return {
    isOpen: false,
    isStreaming: false,
    error: null,
    activeConversationId: fallbackConv.id,
    conversations: [fallbackConv],
  };
}

function aiChatReducer(state: AIChatState, action: AIChatAction): AIChatState {
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, isOpen: action.isOpen };

    case 'TOGGLE_OPEN':
      return { ...state, isOpen: !state.isOpen };

    case 'CREATE_CONVERSATION':
      return {
        ...state,
        error: null,
        activeConversationId: action.conversation.id,
        conversations: [action.conversation, ...state.conversations].slice(
          0,
          MAX_STORED_CONVERSATIONS
        ),
      };

    case 'SELECT_CONVERSATION': {
      const exists = state.conversations.some((c) => c.id === action.conversationId);
      if (!exists) return state;
      return {
        ...state,
        error: null,
        activeConversationId: action.conversationId,
      };
    }

    case 'DELETE_CONVERSATION': {
      const remaining = state.conversations.filter((c) => c.id !== action.conversationId);
      if (remaining.length === 0) {
        const fresh = createEmptyConversation('ar');
        return {
          ...state,
          error: null,
          activeConversationId: fresh.id,
          conversations: [fresh],
        };
      }
      const nextActiveId =
        state.activeConversationId === action.conversationId
          ? remaining[0].id
          : state.activeConversationId;
      return {
        ...state,
        error: null,
        activeConversationId: nextActiveId,
        conversations: remaining,
      };
    }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        isStreaming: false,
        error: null,
        activeConversationId: action.freshConversation.id,
        conversations: [action.freshConversation],
      };

    case 'ADD_USER_MESSAGE': {
      const now = Date.now();
      return {
        ...state,
        error: null,
        conversations: state.conversations.map((conv) =>
          conv.id === action.conversationId
            ? {
                ...conv,
                title: action.title || conv.title,
                updatedAt: now,
                messages: [...conv.messages, action.message].slice(
                  -MAX_MESSAGES_PER_CONVERSATION
                ),
              }
            : conv
        ),
      };
    }

    case 'START_ASSISTANT_MESSAGE':
      return {
        ...state,
        isStreaming: true,
        error: null,
        conversations: state.conversations.map((conv) =>
          conv.id === action.conversationId
            ? {
                ...conv,
                updatedAt: Date.now(),
                messages: [...conv.messages, action.message].slice(
                  -MAX_MESSAGES_PER_CONVERSATION
                ),
              }
            : conv
        ),
      };

    case 'APPEND_ASSISTANT_CHUNK':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.conversationId
            ? {
                ...conv,
                updatedAt: Date.now(),
                messages: conv.messages.map((msg) =>
                  msg.id === action.messageId
                    ? { ...msg, content: msg.content + action.chunk }
                    : msg
                ),
              }
            : conv
        ),
      };

    case 'FINISH_ASSISTANT_MESSAGE':
      return {
        ...state,
        isStreaming: false,
        conversations: state.conversations.map((conv) =>
          conv.id === action.conversationId
            ? {
                ...conv,
                updatedAt: Date.now(),
                messages: conv.messages.map((msg) =>
                  msg.id === action.messageId
                    ? {
                        ...msg,
                        content:
                          action.finalContent !== undefined ? action.finalContent : msg.content,
                        status: 'complete',
                      }
                    : msg
                ),
              }
            : conv
        ),
      };

    case 'FAIL_ASSISTANT_MESSAGE':
      return {
        ...state,
        isStreaming: false,
        error: action.error,
        conversations: state.conversations.map((conv) =>
          conv.id === action.conversationId
            ? {
                ...conv,
                updatedAt: Date.now(),
                messages: conv.messages.map((msg) =>
                  msg.id === action.messageId
                    ? { ...msg, content: action.errorContent, status: 'error' }
                    : msg
                ),
              }
            : conv
        ),
      };

    case 'SET_ERROR':
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export interface AIChatContextValue {
  isOpen: boolean;
  isStreaming: boolean;
  error: string | null;
  conversations: ChatConversation[];
  activeConversation: ChatConversation;
  messages: ChatMessage[];
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  startNewConversation: () => void;
  selectConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  clearHistory: () => void;
  stopGenerating: () => void;
  sendMessage: (text: string, currentPage?: string) => Promise<void>;
  retryLastMessage: (currentPage?: string) => Promise<void>;
  clearError: () => void;
}

const AIChatContext = createContext<AIChatContextValue | undefined>(undefined);

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(aiChatReducer, undefined, loadInitialState);
  const abortControllerRef = useRef<AbortController | null>(null);
  const conversationsRef = useRef(state.conversations);
  const activeIdRef = useRef(state.activeConversationId);

  conversationsRef.current = state.conversations;
  activeIdRef.current = state.activeConversationId;

  // Persist conversation history to localStorage when idle
  useEffect(() => {
    if (state.isStreaming) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeConversationId: state.activeConversationId,
          conversations: state.conversations,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [state.activeConversationId, state.conversations, state.isStreaming]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const activeConversation = useMemo(() => {
    return (
      state.conversations.find((c) => c.id === state.activeConversationId) ||
      state.conversations[0]
    );
  }, [state.conversations, state.activeConversationId]);

  const setOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: 'SET_OPEN', isOpen });
  }, []);

  const toggleOpen = useCallback(() => {
    dispatch({ type: 'TOGGLE_OPEN' });
  }, []);

  const startNewConversation = useCallback(() => {
    abortControllerRef.current?.abort();
    const conv = createEmptyConversation(language);
    dispatch({ type: 'CREATE_CONVERSATION', conversation: conv });
  }, [language]);

  const selectConversation = useCallback((conversationId: string) => {
    abortControllerRef.current?.abort();
    dispatch({ type: 'SELECT_CONVERSATION', conversationId });
  }, []);

  const deleteConversation = useCallback((conversationId: string) => {
    if (activeIdRef.current === conversationId) {
      abortControllerRef.current?.abort();
    }
    dispatch({ type: 'DELETE_CONVERSATION', conversationId });
  }, []);

  const clearHistory = useCallback(() => {
    abortControllerRef.current?.abort();
    const fresh = createEmptyConversation(language);
    dispatch({ type: 'CLEAR_HISTORY', freshConversation: fresh });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [language]);

  const stopGenerating = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', error: null });
  }, []);

  const sendMessage = useCallback(
    async (rawText: string, currentPage?: string) => {
      const text = rawText.trim();
      if (!text || state.isStreaming) return;

      const convId = activeIdRef.current;
      const currentConv =
        conversationsRef.current.find((c) => c.id === convId) || conversationsRef.current[0];
      const priorMessages = (currentConv?.messages || [])
        .filter((m) => m.status !== 'error' && m.content.trim().length > 0)
        .slice(-18)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const userMessage: ChatMessage = {
        id: createUid('usr'),
        role: 'user',
        content: text,
        createdAt: Date.now(),
        status: 'complete',
      };

      const isFirstMessage = (currentConv?.messages?.length || 0) === 0;
      dispatch({
        type: 'ADD_USER_MESSAGE',
        conversationId: convId,
        message: userMessage,
        title: isFirstMessage ? deriveTitleFromPrompt(text) : undefined,
      });

      const assistantMessageId = createUid('ast');
      dispatch({
        type: 'START_ASSISTANT_MESSAGE',
        conversationId: convId,
        message: {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          createdAt: Date.now(),
          status: 'streaming',
        },
      });

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch('/api/ai-assistant/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream, application/json',
          },
          signal: controller.signal,
          body: JSON.stringify({
            message: text,
            history: priorMessages,
            language,
            currentPage: currentPage || 'home',
          }),
        });

        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
          let errMsg =
            language === 'ar'
              ? 'تعذر الاتصال بالمساعد الذكي حالياً.'
              : 'Unable to reach the AI assistant right now.';
          try {
            const errJson = await response.json();
            if (errJson?.error) errMsg = String(errJson.error);
          } catch {
            // ignore JSON parse failure
          }
          dispatch({
            type: 'FAIL_ASSISTANT_MESSAGE',
            conversationId: convId,
            messageId: assistantMessageId,
            error: errMsg,
            errorContent: errMsg,
          });
          return;
        }

        if (contentType.includes('text/event-stream') && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';
          let fullReply = '';

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const events = buffer.split('\n\n');
            buffer = events.pop() || '';

            for (const eventBlock of events) {
              const lines = eventBlock.split('\n');
              for (const line of lines) {
                if (!line.startsWith('data:')) continue;
                const payloadStr = line.slice(5).trim();
                if (!payloadStr || payloadStr === '[DONE]') continue;
                try {
                  const payload = JSON.parse(payloadStr);
                  if (payload.type === 'chunk' && typeof payload.text === 'string') {
                    fullReply += payload.text;
                    dispatch({
                      type: 'APPEND_ASSISTANT_CHUNK',
                      conversationId: convId,
                      messageId: assistantMessageId,
                      chunk: payload.text,
                    });
                  } else if (payload.type === 'error') {
                    const errText =
                      payload.error ||
                      (language === 'ar'
                        ? 'حدث خطأ أثناء توليد الرد.'
                        : 'An error occurred while generating the reply.');
                    dispatch({
                      type: 'FAIL_ASSISTANT_MESSAGE',
                      conversationId: convId,
                      messageId: assistantMessageId,
                      error: errText,
                      errorContent: fullReply || errText,
                    });
                    return;
                  }
                } catch {
                  // Ignore malformed SSE chunk line
                }
              }
            }
          }

          dispatch({
            type: 'FINISH_ASSISTANT_MESSAGE',
            conversationId: convId,
            messageId: assistantMessageId,
            finalContent:
              fullReply ||
              (language === 'ar'
                ? 'لم يتم استلام نص من النموذج. يرجى المحاولة مجدداً.'
                : 'No response text was received. Please try again.'),
          });
        } else {
          const data = await response.json();
          if (data?.success && typeof data?.reply === 'string') {
            dispatch({
              type: 'FINISH_ASSISTANT_MESSAGE',
              conversationId: convId,
              messageId: assistantMessageId,
              finalContent: data.reply,
            });
          } else {
            const errMsg =
              data?.error ||
              (language === 'ar'
                ? 'لم يتمكن المساعد من إكمال الرد.'
                : 'The assistant could not complete the reply.');
            dispatch({
              type: 'FAIL_ASSISTANT_MESSAGE',
              conversationId: convId,
              messageId: assistantMessageId,
              error: errMsg,
              errorContent: errMsg,
            });
          }
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          dispatch({
            type: 'FINISH_ASSISTANT_MESSAGE',
            conversationId: convId,
            messageId: assistantMessageId,
          });
          return;
        }
        const networkMsg =
          language === 'ar'
            ? 'تعذر الاتصال بالخادم. يرجى التحقق من الاتصال والمحاولة مرة أخرى.'
            : 'Network error while connecting to the assistant. Please try again.';
        dispatch({
          type: 'FAIL_ASSISTANT_MESSAGE',
          conversationId: convId,
          messageId: assistantMessageId,
          error: networkMsg,
          errorContent: networkMsg,
        });
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    [language, state.isStreaming]
  );

  const retryLastMessage = useCallback(
    async (currentPage?: string) => {
      const conv =
        conversationsRef.current.find((c) => c.id === activeIdRef.current) ||
        conversationsRef.current[0];
      if (!conv) return;
      const lastUser = [...conv.messages].reverse().find((m) => m.role === 'user');
      if (!lastUser) return;
      await sendMessage(lastUser.content, currentPage);
    },
    [sendMessage]
  );

  const value = useMemo<AIChatContextValue>(
    () => ({
      isOpen: state.isOpen,
      isStreaming: state.isStreaming,
      error: state.error,
      conversations: state.conversations,
      activeConversation,
      messages: activeConversation?.messages || [],
      setOpen,
      toggleOpen,
      startNewConversation,
      selectConversation,
      deleteConversation,
      clearHistory,
      stopGenerating,
      sendMessage,
      retryLastMessage,
      clearError,
    }),
    [
      state.isOpen,
      state.isStreaming,
      state.error,
      state.conversations,
      activeConversation,
      setOpen,
      toggleOpen,
      startNewConversation,
      selectConversation,
      deleteConversation,
      clearHistory,
      stopGenerating,
      sendMessage,
      retryLastMessage,
      clearError,
    ]
  );

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
};

export function useAIChat(): AIChatContextValue {
  const ctx = useContext(AIChatContext);
  if (!ctx) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return ctx;
}
