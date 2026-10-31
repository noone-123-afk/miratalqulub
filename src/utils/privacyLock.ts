const PIN_STORAGE_KEY = 'miraa_privacy_pin';
const PIN_ENABLED_KEY = 'miraa_privacy_pin_enabled';

export interface PrivacyLockConfig {
  isEnabled: boolean;
  hasPin: boolean;
}

export function isPinLockEnabled(): boolean {
  try {
    const enabled = localStorage.getItem(PIN_ENABLED_KEY);
    const pin = localStorage.getItem(PIN_STORAGE_KEY);
    return enabled === 'true' && Boolean(pin && pin.length === 4);
  } catch {
    return false;
  }
}

export function getStoredPin(): string | null {
  try {
    return localStorage.getItem(PIN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setPinLock(pin: string): boolean {
  if (!/^\d{4}$/.test(pin)) return false;
  try {
    localStorage.setItem(PIN_STORAGE_KEY, pin);
    localStorage.setItem(PIN_ENABLED_KEY, 'true');
    return true;
  } catch {
    return false;
  }
}

export function disablePinLock(): void {
  try {
    localStorage.setItem(PIN_ENABLED_KEY, 'false');
  } catch {
    // Ignore
  }
}

export function removePinCompletely(): void {
  try {
    localStorage.removeItem(PIN_STORAGE_KEY);
    localStorage.removeItem(PIN_ENABLED_KEY);
  } catch {
    // Ignore
  }
}

export function verifyPin(inputPin: string): boolean {
  const stored = getStoredPin();
  if (!stored) return true; // If no PIN is configured, allow
  return stored === inputPin;
}
