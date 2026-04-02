import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function WeatherCard({ data }) {
  const { name, main, weather, wind, sys } = data;
  const icon = weather[0].icon;
  const description = weather[0].description;

  return (
    <Card className="flex h-full w-full min-w-0 flex-col transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <div className="min-w-0 space-y-1.5 text-left">
          <CardTitle className="text-lg leading-tight">{name}</CardTitle>
          <Badge variant="secondary" className="font-normal">
            {sys.country}
          </Badge>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="size-14 shrink-0"
        />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 text-left">
        <div className="space-y-3">
          <p className="text-foreground text-3xl font-bold tracking-tight">
            {Math.round(main.temp)}°C
          </p>
          <p className="text-muted-foreground text-sm capitalize">
            {description}
          </p>
          <p className="text-muted-foreground text-sm">
            Ressenti : {Math.round(main.feels_like)}°C
          </p>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2">
          <div className="bg-muted/60 rounded-lg px-2 py-2 text-center">
            <p className="text-muted-foreground text-[0.65rem] font-medium tracking-wide uppercase">
              Humidité
            </p>
            <p className="text-foreground text-sm font-semibold">
              {main.humidity}%
            </p>
          </div>
          <div className="bg-muted/60 rounded-lg px-2 py-2 text-center">
            <p className="text-muted-foreground text-[0.65rem] font-medium tracking-wide uppercase">
              Vent
            </p>
            <p className="text-foreground text-sm font-semibold">
              {Math.round(wind.speed * 3.6)} km/h
            </p>
          </div>
          <div className="bg-muted/60 rounded-lg px-2 py-2 text-center">
            <p className="text-muted-foreground text-[0.65rem] font-medium tracking-wide uppercase">
              Min / Max
            </p>
            <p className="text-foreground text-sm font-semibold">
              {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
