# Presentation du projet - Dashboard Meteo React

## 1) A quoi sert ce projet ?

Ce projet est une application web qui affiche la meteo de plusieurs villes sous forme de cartes.

Il sert a apprendre des notions React importantes :
- faire des appels API,
- gerer des etats,
- organiser une interface en composants,
- optimiser les performances.

En pratique, un utilisateur peut :
- voir une liste de villes au demarrage,
- rechercher des villes dans le monde,
- ajouter des villes favorites dans l'affichage natif,
- trier et paginer les resultats,
- basculer entre un theme `soft` et `dark`.

## 2) Vue globale de l'architecture

Le projet est decoupe en 3 couches simples :

1. **UI principale** : `App.jsx`  
   Assemble les composants et affiche les donnees.

2. **Logique metier** : `hooks/useWeatherApp.js`  
   Gere API, cache, tri, pagination, recherche et ajout de ville.

3. **Composants** : `components/*` et `header/navbar/*`  
   S'occupent du rendu visuel (cards, barre de recherche, boutons, graphique...).

## 3) Extrait cle : App simplifie

`App.jsx` reste volontairement court grace au hook metier :

```jsx
const {
  theme,
  setTheme,
  loading,
  error,
  searchQuery,
  nativeCityInput,
  paginated,
  sorted,
  totalPages,
  currentPage,
  setCurrentPage,
  handleSearch,
  handleSearchSubmit,
  handleNativeCityInputChange,
  handleAddNativeCity,
} = useWeatherApp();
```

**Utilite :**  
On separe clairement la logique et l'affichage.  
Resultat : code plus lisible, plus maintenable, et plus facile a faire evoluer.

## 4) Extrait cle : chargement initial (cache + API)

Dans `useWeatherApp.js`, le flux est :

```jsx
const cachedWeather = getCachedWeather();
if (cachedWeather && cachedWeather.length > 0) {
  setDefaultWeatherData(cachedWeather);
  setWeatherData(cachedWeather);
  return;
}
```

Puis, si le cache est vide, l'application fait les appels API des villes par defaut.

**Utilite :**
- chargement plus rapide si des donnees existent deja,
- moins d'appels reseau inutiles.

## 5) Extrait cle : recherche mondiale

La recherche se fait en 2 etapes :

1. geocodage (`geo/1.0/direct`) pour trouver les correspondances,
2. meteo (`data/2.5/weather`) pour recuperer les details de chaque ville.

```jsx
const geoResponse = await axios.get(
  "https://api.openweathermap.org/geo/1.0/direct",
  { params: { q: query, limit: 8, appid: API_KEY } },
);
```

**Utilite :**
- la recherche n'est pas limitee a une liste fixe,
- elle couvre des villes du monde entier.

## 6) Extrait cle : optimisation performance

Le tri + filtre sont memoises :

```jsx
const sorted = useMemo(() => {
  // filtrage + tri
}, [weatherData, normalizedSearchQuery, sortType, targetTemp]);
```

Et certains composants sont charges en lazy loading :

```jsx
const WeatherChart = lazy(() => import("./components/WeatherChart"));
```

**Utilite :**
- moins de recalculs React,
- bundle initial plus leger.

## 7) Valeur du projet

Ce projet montre un cas realiste de front-end moderne :
- consommation d'API externe,
- UX complete (recherche, tri, pagination, themes),
- optimisation et architecture propre.

Il constitue une bonne base pour evoluer vers :
- tests unitaires,
- TypeScript,
- gestion d'etat plus avancee si besoin.
