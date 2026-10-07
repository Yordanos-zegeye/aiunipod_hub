import { Plus, X } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
  label?: string;
  description?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  badgeClassName?: string;
}

export function TagInput({
  label,
  description,
  tags = [],
  onChange,
  placeholder = "Add item and press Enter...",
  badgeClassName = "bg-primary/10 text-primary border border-primary/20",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-foreground block">{label}</label>}
      {description && <p className="text-[11px] text-muted-foreground">{description}</p>}

      <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl border border-border bg-background/50">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${badgeClassName}`}
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded-sm cursor-pointer"
              title="Remove"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <div className="flex items-center gap-1 flex-1 min-w-[160px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : "Add more..."}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 px-1 py-0.5 focus:outline-hidden"
          />
          {inputValue.trim() && (
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-primary text-primary-foreground p-1 text-[11px] font-semibold hover:opacity-90 flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <Plus className="size-3" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
