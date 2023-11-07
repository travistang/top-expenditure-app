import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const LS_THEME = "@ls/top-expenditure-app/theme";
const DATA_THEME_KEY = "data-theme";

const getDefaultTheme = (): Theme => {
  const storedTheme = localStorage.getItem(LS_THEME);
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  const preferDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return preferDarkTheme ? "dark" : "light";
};
export default function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getDefaultTheme());
  const toggleTheme = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(nextTheme);
  };

  useEffect(() => {
    localStorage.setItem(LS_THEME, currentTheme);
    document.documentElement.setAttribute(DATA_THEME_KEY, currentTheme);
  }, [currentTheme]);
  return [currentTheme, toggleTheme] as const;
}
