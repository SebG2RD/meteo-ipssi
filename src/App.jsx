import { lazy, Suspense } from "react";

import CountryFilter from "./components/CountryFilter";
import NativeCityForm from "./components/NativeCityForm";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "./header/navbar/Navbar";
import { useWeatherApp } from "./hooks/useWeatherApp";

const Pagination = lazy(() => import("./components/Pagination"));
const WeatherChart = lazy(() => import("./components/WeatherChart"));
const SortControls = lazy(() => import("./components/SortControls"));

function App() {
  const {
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
  } = useWeatherApp();

  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <Navbar theme={theme} onThemeChange={setTheme} />
      <main className="mx-auto min-w-0 w-full max-w-6xl flex-1 px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            onSubmit={handleSearchSubmit}
          />
          <NativeCityForm
            value={nativeCityInput}
            onChange={handleNativeCityInputChange}
            onSubmit={handleAddNativeCity}
          />
          <CountryFilter
            value={countryFilter}
            countries={availableCountries}
            onChange={handleCountryFilterChange}
            disabled={loading}
          />
          <Suspense
            fallback={<Skeleton className="h-9 w-full max-w-md rounded-lg" />}
          >
            <SortControls
              sortType={sortType}
              setSortType={setSortType}
              targetTemp={targetTemp}
              setTargetTemp={setTargetTemp}
            />
          </Suspense>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 py-4">
            <Skeleton className="size-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="text-muted-foreground h-3 w-40" />
            </div>
          </div>
        ) : null}

        {error ? (
          <div
            className="border-destructive/40 bg-destructive/10 text-destructive mb-4 rounded-lg border px-4 py-3 text-left text-sm"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {!loading &&
        !error &&
        sorted.length === 0 &&
        (searchQuery.trim() || countryFilter !== "all") ? (
          <p className="text-muted-foreground py-12 text-center text-base">
            {searchQuery.trim() ? (
              <>
                Aucune ville trouvée pour «&nbsp;{searchQuery}&nbsp;»
                {countryFilter !== "all"
                  ? ` (pays : ${countryFilter})`
                  : null}
              </>
            ) : (
              <>
                Aucune ville pour le pays «&nbsp;{countryFilter}&nbsp;» avec les
                filtres actuels.
              </>
            )}
          </p>
        ) : null}

        <ul
          className="m-0 grid w-full list-none grid-cols-1 gap-4 p-0 pb-2 sm:grid-cols-2 sm:gap-5 md:gap-6"
          aria-label="Villes affichées sur cette page"
        >
          {paginated.map((city) => (
            <li key={city.id} className="flex min-h-0 min-w-0 list-none">
              <WeatherCard data={city} />
            </li>
          ))}
        </ul>

        {totalPages > 1 ? (
          <Suspense fallback={<Skeleton className="mx-auto mt-6 h-9 w-48" />}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Suspense>
        ) : null}

        {sorted.length > 0 ? (
          <Suspense
            fallback={<Skeleton className="mt-8 h-[320px] w-full rounded-xl" />}
          >
            <WeatherChart data={sorted} />
          </Suspense>
        ) : null}
      </main>
    </div>
  );
}

export default App;
