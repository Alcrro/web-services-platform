"use client";

import { isValidElement, ReactNode } from "react";

function renderValue(value: unknown): ReactNode {
  if (!value || value === null) {
    return null;
  }
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (isValidElement(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
interface AnimatedCellProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  placeholderWidth?: string; // optional, for skeleton width
  value?: unknown;
}

export const AnimatedCell = ({
  children,
  isLoading = false,
  placeholderWidth,
  value,
}: AnimatedCellProps) => {
  if (isLoading) {
    return (
      <span
        className={`bg-gray-300 rounded-4xl ${
          placeholderWidth && `w-${placeholderWidth}`
        } h-4 animate-pulse`}
      >
        {renderValue(value)}
      </span>
    );
  }

  return <span>{children}</span>;
};
