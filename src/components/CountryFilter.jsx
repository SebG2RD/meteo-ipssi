import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Filtre les villes affichées par code pays (ISO), parmi les pays présents dans les données.
 *
 * @param {{
 *   value: string,
 *   countries: string[],
 *   onChange: (code: string) => void,
 *   disabled?: boolean
 * }} props
 */
function CountryFilter({ value, countries, onChange, disabled = false }) {
  const labelId = useId();

  return (
    <div className="flex w-full min-w-[200px] max-w-xs flex-col gap-1.5 text-left">
      <span className="text-muted-foreground text-xs font-medium" id={labelId}>
        Pays
      </span>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className="h-10 w-full min-w-0"
          aria-labelledby={labelId}
        >
          <SelectValue placeholder="Tous les pays" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les pays</SelectItem>
          {countries.map((code) => (
            <SelectItem key={code} value={code}>
              {code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CountryFilter;
