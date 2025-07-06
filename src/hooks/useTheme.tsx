import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { themes, Theme } from '../components/Settings/ThemeSelector';

interface ThemeContextType {
  theme: Theme;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const getInitialTheme = (): Theme => {
    const saved = localStorage.getItem('selected_theme');
    const found = themes.find(t => t.id === saved);
    return found || themes[0];
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    localStorage.setItem('selected_theme', theme.id);
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--header-color', theme.preview.header);
    root.style.setProperty('--sidebar-color', theme.preview.sidebar);
    root.style.setProperty('--content-color', theme.preview.content);
  }, [theme]);

  const setThemeById = (id: string) => {
    const found = themes.find(t => t.id === id);
    if (found) setTheme(found);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeById }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};