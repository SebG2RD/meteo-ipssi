import { lazy, Suspense } from "react";
import "./App.css";
import NativeCityForm from "./components/NativeCityForm";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
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
  } = useWeatherApp();

  return (
    <div className="app">
      <Navbar theme={theme} onThemeChange={setTheme} />
      <main className="main">
        <div className="toolbar">
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
          <Suspense
            fallback={<p className="status">Chargement des filtres…</p>}
          >
            <SortControls
              sortType={sortType}
              setSortType={setSortType}
              targetTemp={targetTemp}
              setTargetTemp={setTargetTemp}
            />
          </Suspense>
        </div>

        {loading && (
          <div className="status">
            <div className="spinner" />
            <p>Chargement des données météo…</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {!loading && !error && sorted.length === 0 && searchQuery.trim() && (
          <p className="no-results">
            Aucune ville trouvée pour «&nbsp;{searchQuery}&nbsp;»
          </p>
        )}

        <div className="cards-grid">
          {paginated.map((city) => (
            <WeatherCard key={city.id} data={city} />
          ))}
        </div>

        {totalPages > 1 && (
          <Suspense
            fallback={<p className="status">Chargement de la pagination…</p>}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Suspense>
        )}

        {sorted.length > 0 && (
          <Suspense
            fallback={<p className="status">Chargement du graphique…</p>}
          >
            <WeatherChart data={sorted} />
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default App;
