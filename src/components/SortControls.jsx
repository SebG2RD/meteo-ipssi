import { ArrowDown, ArrowUp, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SortControls({ sortType, setSortType, targetTemp, setTargetTemp }) {
  const toggle = (type) => setSortType(sortType === type ? null : type);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant={sortType === "asc" ? "default" : "outline"}
        size="sm"
        onClick={() => toggle("asc")}
      >
        <ArrowUp className="size-3.5" />
        Croissant
      </Button>
      <Button
        type="button"
        variant={sortType === "desc" ? "default" : "outline"}
        size="sm"
        onClick={() => toggle("desc")}
      >
        <ArrowDown className="size-3.5" />
        Décroissant
      </Button>
      <div className="border-border flex items-center gap-1 rounded-lg border px-1.5 py-0.5">
        <Button
          type="button"
          variant={sortType === "proximity" ? "default" : "ghost"}
          size="sm"
          onClick={() => toggle("proximity")}
        >
          <Target className="size-3.5" />
          Proximité
        </Button>
        <Input
          type="number"
          className="h-8 w-14 border-0 bg-transparent px-1 text-center shadow-none focus-visible:ring-0"
          value={targetTemp}
          onChange={(e) => setTargetTemp(Number(e.target.value))}
          aria-label="Température cible en °C"
        />
        <span className="text-muted-foreground pr-1 text-xs">°C</span>
      </div>
    </div>
  );
}

export default SortControls;
