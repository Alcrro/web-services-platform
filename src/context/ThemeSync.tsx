"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeStore } from "./themeStore";

export function ThemeSync() {
  const { theme } = useTheme();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    if (theme) setTheme(theme as "light" | "dark");
  }, [theme, setTheme]);

  return null;
}
