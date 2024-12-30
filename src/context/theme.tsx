
import { useState, createContext, useContext, useEffect } from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (dark: boolean) => void;
} | null>(null);

type Props = { children: React.ReactNode };

export function ThemeContextProvider({ children }: Props) {
  const [theme, setThemeInternal] = useState<Theme>(() =>
    document.body.classList.contains("dark") ? "dark" : "light",
  );

  const setDark = () => {
    setThemeInternal("dark");
    window.localStorage.setItem("theme", "dark");

    document.body.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  };

  const setLight = () => {
    setThemeInternal("light");
    window.localStorage.setItem("theme", "light");

    document.body.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  };

  const setTheme = (dark: boolean) => {
    if (dark) {
      setDark();
    } else {
      setLight();
    }

    document.body.classList.add("no-duration");
    setTimeout(() => document.body.classList.remove("no-duration"), 1);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme | null;

    if (localTheme) {
      if (localTheme === "dark") setDark();
      else setLight();
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark();
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context == null) {
    throw new Error("useTheme must be used within an ThemeContextProvider");
  }

  return context;
}
