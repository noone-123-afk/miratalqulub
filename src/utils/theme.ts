import { useState, useEffect } from 'react';

export type AppTheme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'mirat_al_quloob_theme';

export function getInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (e) {
    console.error('Failed to read theme from localStorage', e);
  }
  return 'dark';
}

export function applyTheme(theme: AppTheme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent('app-theme-changed', { detail: { theme } }));
  } catch (e) {
    console.error('Failed to persist theme in localStorage', e);
  }
}

export function useAppTheme(): [AppTheme, (newTheme?: AppTheme) => void] {
  const [theme, setThemeState] = useState<AppTheme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: AppTheme }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    window.addEventListener('app-theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('app-theme-changed', handleThemeChange);
    };
  }, []);

  const toggleTheme = (newTheme?: AppTheme) => {
    const target = newTheme || (theme === 'dark' ? 'light' : 'dark');
    setThemeState(target);
    applyTheme(target);
  };

  return [theme, toggleTheme];
}
