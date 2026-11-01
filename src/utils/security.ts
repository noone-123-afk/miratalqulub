/**
 * Security, Input Sanitization, and Anti-Spam Utility
 * Protects against XSS, script injection, link abuse, and spam floods
 */

// Simple, high-performance HTML escaping to prevent XSS
export function sanitizeText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Strips HTML tags entirely for plain text inputs (names, subjects, summaries)
export function stripHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/<\/?[^>]+(>|$)/g, '').trim();
}

// Validates email syntax strictly to block malicious injection
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

// Client-side rate limiter for spam prevention (e.g. feedback submission, comments)
const SUBMISSION_TIMESTAMPS: Record<string, number[]> = {};

export function checkRateLimit(actionKey: string, maxAttempts = 5, windowMs = 60000): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  if (!SUBMISSION_TIMESTAMPS[actionKey]) {
    SUBMISSION_TIMESTAMPS[actionKey] = [];
  }

  // Remove timestamps outside window
  SUBMISSION_TIMESTAMPS[actionKey] = SUBMISSION_TIMESTAMPS[actionKey].filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (SUBMISSION_TIMESTAMPS[actionKey].length >= maxAttempts) {
    const oldest = SUBMISSION_TIMESTAMPS[actionKey][0];
    const waitSeconds = Math.ceil((windowMs - (now - oldest)) / 1000);
    return { allowed: false, waitSeconds };
  }

  SUBMISSION_TIMESTAMPS[actionKey].push(now);
  return { allowed: true };
}

// Link abuse prevention: flags spam link patterns
export function containsSpamLinks(text: string): boolean {
  if (!text) return false;
  const spamKeywords = [
    'casino',
    'viagra',
    'crypto giveaway',
    'free money',
    'betting',
    'buy followers',
    'whatsapp sex',
  ];
  const lower = text.toLowerCase();
  return spamKeywords.some((keyword) => lower.includes(keyword));
}
