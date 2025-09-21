import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark';

interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

interface ColorSchemeProviderProps {
  children: ReactNode;
}

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
  };

  const contextValue = {
    colorScheme,
    setColorScheme,
    toggleColorScheme
  };

  return React.createElement(
    ColorSchemeContext.Provider,
    { value: contextValue },
    children
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};