import React, { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = [
  {
    id: 'dark',
    name: 'Dark Teal',
    emoji: '🌑',
    preview: ['#050a0e', '#14b8a6', '#0d9488'],
  },
  {
    id: 'light',
    name: 'Light',
    emoji: '☀️',
    preview: ['#f0f4f8', '#0d9488', '#14b8a6'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    emoji: '🌌',
    preview: ['#0a0f1e', '#6366f1', '#818cf8'],
  },
  {
    id: 'aurora',
    name: 'Aurora',
    emoji: '🌸',
    preview: ['#0f0a1a', '#a855f7', '#ec4899'],
  },
  {
    id: 'forest',
    name: 'Forest',
    emoji: '🌿',
    preview: ['#071a0e', '#22c55e', '#16a34a'],
  },
];

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  themes: THEMES,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('codeeval-theme') || 'dark';
  });

  const setTheme = (id) => {
    setThemeState(id);
    localStorage.setItem('codeeval-theme', id);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
