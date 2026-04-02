import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const API_KEY = /** @type {{ env?: { VITE_WEATHER_API_KEY?: string } }} */ (
  import.meta
).env?.VITE_WEATHER_API_KEY;
const ITEMS_PER_PAGE = 4;
const CACHE_KEY = "weather_cache_v1";
const THEME_KEY = "weather_theme_v1";
const DEFAULT_CITIES = [
  "Paris",
  "London",
  "New York",
  "Tokyo",
  "Berlin",
  "Madrid",
  "Sydney",
  "Dubai",
];

/** @param {string} value */
const normalizeText = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** @param {unknown} err */
const isRequestCanceled = (err) =>
  axios.isCancel(err) ||
  (typeof err === "object" &&
    err !== null &&
    ("code" in err ? err.code === "ERR_CANCELED" : false));

/** @param {any[]} cities */
const mergeUniqueCities = (cities) => {
  const byId = new Map(cities.map((city) => [city.id, city]));
  return Array.from(byId.values());
};

/** @param {any[]} cities @param {any} city */
const prependCityUnique = (cities, city) => {
  const withoutCity = cities.filter((item) => item.id !== city.id);
  return [city, ...withoutCity];
};

const getCachedWeather = () => {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (!rawCache) return null;

    const parsedCache = JSON.parse(rawCache);
    if (!Array.isArray(parsedCache)) return null;

    return mergeUniqueCities(parsedCache);
  } catch {
    return null;
  }
};

export function useWeatherApp() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme === "dark" ? "dark" : "soft";
  });
  const [weatherData, setWeatherData] = useState(/** @type {any[]} */ ([]));
  const [defaultWeatherData, setDefaultWeatherData] = useState(
    /** @type {any[]} */ ([]),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [targetTemp, setTargetTemp] = useState(20);
  const [nativeCityInput, setNativeCityInput] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!API_KEY) {
      setError("Clé API manquante. Vérifiez VITE_WEATHER_API_KEY.");
      return;
    }

    const controller = new AbortController();

    const fetchDefaultCities = async () => {
      const timerLabel = "[Perf] Chargement initial";
      let timerStarted = false;
      try {
        console.time(timerLabel);
        timerStarted = true;
        setLoading(true);
        setError(null);

        const cachedWeather = getCachedWeather();
        if (cachedWeather && cachedWeather.length > 0) {
          setDefaultWeatherData(cachedWeather);
          setWeatherData(cachedWeather);
          return;
        }

        const requests = DEFAULT_CITIES.map((city) =>
          axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: { q: city, appid: API_KEY, units: "metric", lang: "fr" },
            signal: controller.signal,
          }),
        );

        const responses = await Promise.allSettled(requests);
        const successfulResponses = responses
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data);
        const rejectedResponses = responses.filter(
          (result) => result.status === "rejected",
        );
        const allRejectedAreCanceled =
          rejectedResponses.length === responses.length &&
          rejectedResponses.every((result) => isRequestCanceled(result.reason));

        if (controller.signal.aborted || allRejectedAreCanceled) return;

        if (successfulResponses.length === 0) {
          setError("Impossible de charger les villes initiales.");
          return;
        }

        const initialCities = mergeUniqueCities(successfulResponses);
        setDefaultWeatherData(initialCities);
        setWeatherData(initialCities);
        localStorage.setItem(CACHE_KEY, JSON.stringify(initialCities));
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Erreur réseau pendant le chargement initial.");
      } finally {
        if (timerStarted) {
          console.timeEnd(timerLabel);
        }
        setLoading(false);
      }
    };

    fetchDefaultCities();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const query = submittedQuery.trim();
    if (!query || query.length < 2) return;
    if (!API_KEY) {
      setError("Clé API manquante. Vérifiez VITE_WEATHER_API_KEY.");
      return;
    }

    const controller = new AbortController();

    const fetchCities = async () => {
      const timerLabel = `[Perf] Recherche: ${query}`;
      let timerStarted = false;
      try {
        console.time(timerLabel);
        timerStarted = true;
        setLoading(true);
        setError(null);

        const geoResponse = await axios.get(
          "https://api.openweathermap.org/geo/1.0/direct",
          {
            params: { q: query, limit: 8, appid: API_KEY },
            signal: controller.signal,
          },
        );

        const matches = geoResponse.data;
        if (!Array.isArray(matches) || matches.length === 0) {
          setError(
            "Ville introuvable. Essaye 'ville, code pays' (ex: Paris, FR ou Springfield, US).",
          );
          return;
        }

        const requests = matches.map((place) =>
          axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
              lat: place.lat,
              lon: place.lon,
              appid: API_KEY,
              units: "metric",
              lang: "fr",
            },
            signal: controller.signal,
          }),
        );
        const responses = await Promise.allSettled(requests);
        const successfulResponses = responses
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value.data);

        if (successfulResponses.length === 0) {
          setError("Aucune donnée météo disponible pour cette recherche.");
          return;
        }

        setWeatherData(mergeUniqueCities(successfulResponses));
      } catch (err) {
        if (axios.isCancel(err)) return;
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError(
            "Ville introuvable. Vérifie l'orthographe ou ajoute le code pays (ex: Rome, IT).",
          );
          return;
        }
        setError("Erreur réseau pendant la recherche de ville.");
      } finally {
        if (timerStarted) {
          console.timeEnd(timerLabel);
        }
        setLoading(false);
      }
    };

    fetchCities();
    return () => controller.abort();
  }, [submittedQuery]);

  const normalizedSearchQuery = useMemo(
    () => normalizeText(searchQuery),
    [searchQuery],
  );

  const availableCountries = useMemo(() => {
    const codes = new Set();
    for (const city of weatherData) {
      const code = city.sys?.country;
      if (code) codes.add(code);
    }
    return [...codes].sort((a, b) => a.localeCompare(b, "fr"));
  }, [weatherData]);

  useEffect(() => {
    if (
      countryFilter !== "all" &&
      !availableCountries.includes(countryFilter)
    ) {
      setCountryFilter("all");
    }
  }, [availableCountries, countryFilter]);

  const sorted = useMemo(() => {
    const filtered = weatherData.filter((city) => {
      if (countryFilter !== "all") {
        const code = city.sys?.country ?? "";
        if (code !== countryFilter) return false;
      }

      if (!normalizedSearchQuery) return true;

      const cityName = normalizeText(city.name ?? "");
      const cityWithCountry = normalizeText(
        `${city.name ?? ""}, ${city.sys?.country ?? ""}`,
      );

      return (
        cityName.includes(normalizedSearchQuery) ||
        cityWithCountry.includes(normalizedSearchQuery)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortType === "asc") return a.main.temp - b.main.temp;
      if (sortType === "desc") return b.main.temp - a.main.temp;
      if (sortType === "proximity") {
        return (
          Math.abs(a.main.temp - targetTemp) - Math.abs(b.main.temp - targetTemp)
        );
      }
      return 0;
    });
  }, [
    weatherData,
    normalizedSearchQuery,
    countryFilter,
    sortType,
    targetTemp,
  ]);

  const totalPages = useMemo(
    () => Math.ceil(sorted.length / ITEMS_PER_PAGE),
    [sorted],
  );

  const paginated = useMemo(
    () =>
      sorted.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [sorted, currentPage],
  );

  const handleSearch = useCallback(
    (value) => {
      setSearchQuery(value);
      if (!value.trim()) {
        setSubmittedQuery("");
        setError(null);
        setWeatherData(defaultWeatherData);
      }
      setCurrentPage(1);
    },
    [defaultWeatherData],
  );

  const handleSearchSubmit = useCallback((value) => {
    const normalizedValue = value.trim();
    if (!normalizedValue) return;
    setSubmittedQuery(normalizedValue);
  }, []);

  const handleNativeCityInputChange = useCallback((value) => {
    setNativeCityInput(value);
  }, []);

  const handleCountryFilterChange = useCallback((value) => {
    setCountryFilter(value);
    setCurrentPage(1);
  }, []);

  const handleAddNativeCity = useCallback(
    async (event) => {
      event.preventDefault();
      const query = nativeCityInput.trim();
      if (!query || !API_KEY) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: { q: query, appid: API_KEY, units: "metric", lang: "fr" },
          },
        );

        const cityData = response.data;
        setNativeCityInput("");
        setCurrentPage(1);

        setDefaultWeatherData((prev) => {
          const updatedDefault = prependCityUnique(prev, cityData);
          localStorage.setItem(CACHE_KEY, JSON.stringify(updatedDefault));

          if (!searchQuery.trim() && !submittedQuery.trim()) {
            setWeatherData(updatedDefault);
          }

          return updatedDefault;
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("Ville introuvable pour ajout natif (ex: Lima, PE).");
          return;
        }
        setError("Impossible d'ajouter cette ville pour le moment.");
      } finally {
        setLoading(false);
      }
    },
    [nativeCityInput, searchQuery, submittedQuery],
  );

  return {
    theme,
    setTheme,
    loading,
    error,
    searchQuery,
    nativeCityInput,
    countryFilter,
    availableCountries,
    sortType,
    targetTemp,
    paginated,
    sorted,
    totalPages,
    currentPage,
    setCurrentPage,
    setSortType,
    setTargetTemp,
    handleSearch,
    handleSearchSubmit,
    handleNativeCityInputChange,
    handleAddNativeCity,
    handleCountryFilterChange,
  };
}
