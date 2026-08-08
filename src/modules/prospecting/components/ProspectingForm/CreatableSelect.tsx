"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface CreatableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border bg-white border-gray-200 text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:border-gray-400 dark:bg-white/5 dark:border-white/10 dark:focus:border-white/30";

const optionCls =
  "px-3 py-2 text-sm cursor-pointer text-(--color-text) hover:bg-gray-100 dark:hover:bg-white/10 transition-colors";

export default function CreatableSelect({
  options,
  value,
  onChange,
  placeholder = "Selectează sau tastează...",
  disabled,
}: CreatableSelectProps) {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(inputValue.toLowerCase())
  );
  const showCreate =
    inputValue.trim() &&
    !options.some((o) => o.toLowerCase() === inputValue.trim().toLowerCase());

  const handleSelect = (val: string) => {
    const normalized = val.trim().replace(/^\w/, (c) => c.toUpperCase());
    setInputValue(normalized);
    onChange(normalized);
    setOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputCls}
        />
        <div className="absolute right-2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 text-(--color-text-secondary) hover:text-(--color-text)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-(--color-text-secondary) transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {open && (filtered.length > 0 || showCreate) && (
        <div className="absolute z-20 w-full mt-1 rounded-lg border bg-white border-gray-200 shadow-lg dark:bg-[#1e293b] dark:border-white/10 overflow-hidden">
          {filtered.map((opt) => (
            <div key={opt} className={optionCls} onMouseDown={() => handleSelect(opt)}>
              {opt}
            </div>
          ))}
          {showCreate && (
            <div
              className={`${optionCls} text-(--color-accent) border-t border-gray-100 dark:border-white/10`}
              onMouseDown={() => handleSelect(inputValue)}
            >
              + Adaugă &quot;{inputValue.trim()}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
