import React, {Context, createContext, useContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark';
type ThemeSetter = (theme: Theme) => void;
type ThemeBundle = [Theme, ThemeSetter];

const initialTheme = 'dark';
const defaultThemeContextValue: ThemeBundle = [initialTheme, () => {
    throw new Error('No ThemeProvider found.');
}];
const ThemeContext: Context<ThemeBundle> = createContext<ThemeBundle>(defaultThemeContextValue);

interface ThemeProps {
    children: React.ReactNode
}

export function Theme(props: ThemeProps) {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark")
        root.classList.add(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
