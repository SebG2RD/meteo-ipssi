import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   onSubmit?: (value: string) => void
 * }} props
 */
function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden
      />
      <Input
        className="h-10 pr-10 pl-10"
        placeholder="Rechercher une ville puis Entrée"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit(value);
        }}
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-1/2 right-1 -translate-y-1/2"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
        >
          <X className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

export default SearchBar;
