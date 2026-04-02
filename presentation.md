# Présentation du projet — Dashboard météo React

**Contexte :** ce projet a été **réalisé à trois**. Dans la suite, **nous** désigne notre équipe de trois personnes.

---

## 1) À quoi sert ce projet ?

Nous avons développé une application web qui affiche la météo de plusieurs villes sous forme de **cartes**, avec un **graphique** de comparaison des températures.

Elle nous a permis de mettre en pratique des notions React importantes :

- appels API et gestion du chargement / des erreurs ;
- état local et découpage en composants ;
- **interface soignée** avec une bibliothèque de composants (shadcn/ui) ;
- optimisations de rendu et de bundle.

En pratique, l’utilisateur peut :

- voir **8 villes** au chargement (avec reprise depuis le **cache navigateur** si disponible) ;
- **rechercher** des villes dans le monde (validation avec **Entrée**) ;
- **filtrer par pays** (codes ISO présents dans les données affichées) ;
- **ajouter** une ville à l’affichage « natif » (elle apparaît en tête de liste enregistrée) ;
- **trier** (température croissante / décroissante / proximité d’une cible °C) ;
- **paginer** (4 villes par page, grille **2 × 2** sur la largeur du contenu) ;
- consulter un **graphique** (Recharts) ;
- basculer **thème clair / sombre** (classe `dark` sur la racine HTML, persistance locale).

---

## 2) Vue globale de l’architecture

Le projet repose sur **trois niveaux** :

1. **`App.jsx`** — Assemble l’interface : navbar, barre d’outils (recherche, ajout, filtre pays, tri), liste de cartes, pagination, graphique. Reste court car la logique vit dans un hook.

2. **`hooks/useWeatherApp.js`** — Logique métier : appels OpenWeatherMap, `localStorage` pour le cache météo et le thème, filtres (texte + pays), tri, pagination, handlers.

3. **`components/*`** — Composants « métier » (SearchBar, CountryFilter, WeatherCard, etc.).

4. **`components/ui/*`** — Primitives **[shadcn/ui](https://ui.shadcn.com/)** (Button, Input, Card, Select, Badge, Skeleton…), stylées avec **Tailwind CSS v4**.

---

## 3) Extrait clé : `App.jsx` allégé

`App.jsx` délègue l’état et les actions au hook :

```jsx
const {
  theme,
  setTheme,
  loading,
  error,
  searchQuery,
  nativeCityInput,
  countryFilter,
  availableCountries,
  paginated,
  sorted,
  totalPages,
  currentPage,
  setCurrentPage,
  handleSearch,
  handleSearchSubmit,
  handleCountryFilterChange,
  handleAddNativeCity,
  // … tri, etc.
} = useWeatherApp();
```

**Intérêt :** séparation nette **logique / présentation**, fichiers plus lisibles et plus simples à faire évoluer.

---

## 4) Extrait clé : chargement initial (cache + API)

Si des données valides sont dans `localStorage`, **nous** les affichons tout de suite ; sinon **nous** chargeons les 8 villes par défaut puis **nous** mettons le cache à jour.

```jsx
const cachedWeather = getCachedWeather();
if (cachedWeather && cachedWeather.length > 0) {
  setDefaultWeatherData(cachedWeather);
  setWeatherData(cachedWeather);
  return;
}
```

**Intérêt :** moins d’attente et moins d’appels réseau au rechargement de la page.

---

## 5) Extrait clé : recherche mondiale

La recherche utilise d’abord le **géocodage**, puis la météo par coordonnées :

```jsx
const geoResponse = await axios.get(
  "https://api.openweathermap.org/geo/1.0/direct",
  { params: { q: query, limit: 8, appid: API_KEY } },
);
```

**Intérêt :** pas de liste de villes figée : l’utilisateur peut cibler des endroits partout dans le monde (avec précision du pays si besoin, ex. `Springfield, US`).

---

## 6) Extrait clé : filtre par pays

Les pays proposés sont **dérivés des données** (`sys.country`). Le filtre se combine avec la recherche texte.

```jsx
const availableCountries = useMemo(() => {
  const codes = new Set();
  for (const city of weatherData) {
    const code = city.sys?.country;
    if (code) codes.add(code);
  }
  return [...codes].sort((a, b) => a.localeCompare(b, "fr"));
}, [weatherData]);
```

Dans la chaîne de filtrage, si un pays est choisi (autre que « Tous »), on ne garde que les villes de ce code ISO.

**Intérêt :** filtre pertinent et toujours **à jour** avec l’ensemble affiché.

---

## 7) Extrait clé : interface avec shadcn/ui

Les champs, boutons, cartes et le sélecteur de pays utilisent des composants shadcn (souvent basés sur **Base UI** + **Tailwind**), par exemple un `Select` pour le pays :

```jsx
<Select value={value} onValueChange={onChange}>
  <SelectTrigger className="h-10 w-full">
    <SelectValue placeholder="Tous les pays" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">Tous les pays</SelectItem>
    {countries.map((code) => (
      <SelectItem key={code} value={code}>{code}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

**Intérêt :** UX homogène (focus, contrastes, thème clair/sombre), moins de CSS « maison » à maintenir.

---

## 8) Extrait clé : optimisations

Le pipeline **filtre → tri** est recalculé seulement quand les entrées utiles changent :

```jsx
const sorted = useMemo(() => {
  // filtre pays, filtre texte, tri…
}, [
  weatherData,
  normalizedSearchQuery,
  countryFilter,
  sortType,
  targetTemp,
]);
```

Certains blocs lourds sont chargés à la demande :

```jsx
const WeatherChart = lazy(() => import("./components/WeatherChart"));
```

**Intérêt :** moins de recalculs inutiles et bundle initial plus léger.

---

## 9) Valeur du projet

Pour **nous**, ce travail illustre un cas d’usage réaliste de front-end moderne :

- consommation d’**API externe** documentée ;
- **UX** complète (recherche, pays, tri, pagination, graphique, thème) ;
- **design system** (shadcn/ui) et **Tailwind** ;
- **architecture** claire (hook + composants) et **qualité** (lint, build).

**Pistes d’évolution** que nous envisageons : tests sur `useWeatherApp`, TTL pour le cache, suppression d’une ville du jeu natif, internationalisation des libellés de pays, etc.
