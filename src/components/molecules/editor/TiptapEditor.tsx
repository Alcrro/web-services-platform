"use client";
import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import type { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface Feature {
  id: string;
  name: string;
}

interface Props {
  initialContent?: string;
  placeholder?: string;
  serviceFeatures?: Feature[];
  minHeight?: string;
  onChange: (html: string, text: string) => void;
}

interface MentionListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

const MentionList = forwardRef<MentionListRef, {
  items: Feature[];
  command: (item: { id: string; label: string }) => void;
}>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    onKeyDown({ event }: SuggestionKeyDownProps) {
      if (event.key === "ArrowUp") {
        setSelectedIndex((i) => (i - 1 + items.length) % items.length);
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((i) => (i + 1) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        const item = items[selectedIndex];
        if (item) command({ id: item.id, label: item.name });
        return true;
      }
      return false;
    },
  }));

  useEffect(() => setSelectedIndex(0), [items]);

  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-0.5 p-1.5 rounded-lg border border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-800 shadow-xl min-w-[200px] max-h-52 overflow-y-auto">
      {items.map((item, idx) => (
        <button
          key={item.id}
          onMouseDown={(e) => {
            e.preventDefault();
            command({ id: item.id, label: item.name });
          }}
          className={`text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
            idx === selectedIndex
              ? "bg-(--color-accent)/10 text-(--color-accent)"
              : "text-(--color-text) hover:bg-(--color-bg-hover)"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
});
MentionList.displayName = "MentionList";

function createSuggestion(features: Feature[]) {
  return {
    items: ({ query }: { query: string }) =>
      features.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8),
    render: () => {
      let renderer: ReactRenderer<MentionListRef>;
      let el: HTMLDivElement;

      const updatePos = (clientRect: (() => DOMRect | null) | null | undefined) => {
        const rect = clientRect?.();
        if (rect && el) {
          el.style.top = `${rect.bottom + 6}px`;
          el.style.left = `${rect.left}px`;
        }
      };

      return {
        onStart(props: SuggestionProps<Feature>) {
          // ReactRenderer expects ComponentType<R, P> — forwardRef components need a cast
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderer = new ReactRenderer<MentionListRef>(MentionList as any, {
            props,
            editor: props.editor,
          });
          el = document.createElement("div");
          el.style.cssText = "position:fixed;z-index:9999;";
          document.body.appendChild(el);
          el.appendChild(renderer.element);
          updatePos(props.clientRect);
        },
        onUpdate(props: SuggestionProps<Feature>) {
          renderer.updateProps(props);
          updatePos(props.clientRect);
        },
        onKeyDown(props: SuggestionKeyDownProps) {
          if (props.event.key === "Escape") {
            el?.remove();
            renderer.destroy();
            return true;
          }
          return renderer.ref?.onKeyDown(props) ?? false;
        },
        onExit() {
          el?.remove();
          renderer.destroy();
        },
      };
    },
  };
}

export default function TiptapEditor({
  initialContent = "",
  placeholder = "Scrie ce ai discutat cu clientul...",
  serviceFeatures = [],
  minHeight = "160px",
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Mention.configure({
        HTMLAttributes: { class: "mention" },
        suggestion: createSuggestion(serviceFeatures),
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getText());
    },
  });

  if (!editor) return null;

  const tbBtn = (active: boolean) =>
    `p-1.5 rounded transition-colors ${
      active
        ? "bg-(--color-accent)/15 text-(--color-accent)"
        : "text-(--color-text-secondary) hover:bg-(--color-bg-hover) hover:text-(--color-text)"
    }`;

  return (
    <div className="flex flex-col rounded-lg border border-(--color-border) dark:border-white/10 bg-(--color-bg) focus-within:ring-2 focus-within:ring-(--color-accent)/30 focus-within:border-(--color-accent) transition-colors overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-700/30">
        <button
          type="button"
          title="Bold"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
          className={tbBtn(editor.isActive("bold"))}
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Italic"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
          className={tbBtn(editor.isActive("italic"))}
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-(--color-border) dark:bg-white/10 mx-1" />

        <button
          type="button"
          title="Bullet list"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
          className={tbBtn(editor.isActive("bulletList"))}
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Numbered list"
          onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }}
          className={tbBtn(editor.isActive("orderedList"))}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        {serviceFeatures.length > 0 && (
          <>
            <div className="w-px h-4 bg-(--color-border) dark:bg-white/10 mx-1" />
            <span className="text-[10px] text-(--color-text-secondary) px-1 select-none">
              Scrie <kbd className="px-1 py-0.5 rounded bg-(--color-bg-hover) font-mono text-[9px]">@</kbd> pentru features
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div
        className="[&_.ProseMirror]:outline-none [&_.ProseMirror]:p-3 [&_.ProseMirror]:text-sm [&_.ProseMirror]:text-(--color-text) [&_.ProseMirror]:leading-relaxed [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_li]:my-0.5 [&_.ProseMirror_p]:my-0.5 [&_.ProseMirror_p.is-empty:first-child]:before:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-empty:first-child]:before:text-(--color-text-secondary) [&_.ProseMirror_p.is-empty:first-child]:before:pointer-events-none [&_.ProseMirror_p.is-empty:first-child]:before:float-left [&_.ProseMirror_p.is-empty:first-child]:before:h-0"
        style={{ minHeight }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
