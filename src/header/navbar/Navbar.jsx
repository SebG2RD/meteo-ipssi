import { CloudSun, Moon, Sun } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Navbar({ theme, onThemeChange }) {
  const nextTheme = theme === "dark" ? "soft" : "dark";

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <CloudSun className="text-primary size-6" aria-hidden />
          <span>WeatherBoard</span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Badge variant="outline" className="font-normal">
            OpenWeatherMap API
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onThemeChange(nextTheme)}
            aria-label={
              nextTheme === "dark"
                ? "Passer au thème sombre"
                : "Passer au thème clair"
            }
          >
            {theme === "dark" ? (
              <>
                <Moon className="size-4" />
                Sombre
              </>
            ) : (
              <>
                <Sun className="size-4" />
                Clair
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
