"use client";
import { ReactNode, useRef } from "react";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const CardTilt = ({ children, className = "h-full", intensity = 10 }: CardTiltProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -intensity * 2;
    const rotY = (x - 0.5) * intensity * 2;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: "transform 0.25s ease-out",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export default CardTilt;
