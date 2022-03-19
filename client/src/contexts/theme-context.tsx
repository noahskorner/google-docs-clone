import { createContext, useEffect, useState } from 'react';
import ThemeEnum from '../enums/theme-enum';

interface ThemeInterface {
  theme: ThemeEnum;
  setTheme: Function;
}

export const ThemeContext = createContext<ThemeInterface | null>(null);

interface ThemeProviderInterface {
  children: JSX.Element;
}

export const ThemeProvider = ({ children }: ThemeProviderInterface) => {
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme ? parseInt(storedTheme) : ThemeEnum.LIGHT;
    } catch (error) {
      return ThemeEnum.LIGHT;
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', theme.toString());
    const html = document.getElementsByTagName('html')[0];

    if (theme === ThemeEnum.LIGHT && html.classList.contains('dark')) {
      html.classList.remove('dark');
    } else if (theme === ThemeEnum.DARK && !html.classList.contains('dark')) {
      html.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
