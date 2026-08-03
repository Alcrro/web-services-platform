"use client";
import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.12, rootMargin = "0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [fromAbove, setFromAbove] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setFromAbove(entry.boundingClientRect.top < 0);
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView, fromAbove };
}

/** Returnează inline styles pentru animație scroll — opus Tailwind classes */
export function animStyle(
  inView: boolean,
  fromAbove: boolean,
  delayMs = 0
): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: `translateY(${inView ? 0 : fromAbove ? -52 : 52}px)`,
    transition: `opacity 0.65s ease-out ${delayMs}ms, transform 0.65s ease-out ${delayMs}ms`,
    willChange: "opacity, transform",
  };
}

/** Animație stânga-dreapta — pentru secțiuni cu layout orizontal (ex: process steps) */
export function animStyleX(
  inView: boolean,
  delayMs = 0
): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: `translateX(${inView ? 0 : -52}px)`,
    transition: `opacity 0.65s ease-out ${delayMs}ms, transform 0.65s ease-out ${delayMs}ms`,
    willChange: "opacity, transform",
  };
}
