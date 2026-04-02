import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * @param {{
 *   value: string,
 *   onChange: (value: string) => void,
 *   onSubmit: (event: import("react").FormEvent<HTMLFormElement>) => void
 * }} props
 */
function NativeCityForm({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md items-center gap-2"
    >
      <Input
        className="h-10 min-w-0 flex-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ajouter une ville (affichage natif)"
      />
      <Button type="submit" variant="secondary" className="h-10 shrink-0">
        Ajouter
      </Button>
    </form>
  );
}

export default NativeCityForm;
