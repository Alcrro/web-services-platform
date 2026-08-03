"use client";
import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeSync } from "./ThemeSync";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ThemeSync />
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
