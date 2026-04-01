# TP React Avancé - Dashboard Météo

Application React qui consomme l'API OpenWeatherMap pour afficher des cartes météo de villes, avec recherche mondiale, pagination, tri, graphique et gestion de thème.

## Objectifs pédagogiques

- Comprendre l'appel API côté front avec `axios`.
- Manipuler l'état React pour afficher une liste dynamique.
- Ajouter des fonctionnalités UI utiles : recherche, tri, pagination, thème.
- Optimiser les performances (`useMemo`, lazy loading).
- Structurer un projet React proprement (hook métier + composants UI).

## Fonctionnalités

- Chargement initial de 8 villes avec fallback `localStorage`.
- Recherche mondiale de villes (entrée + touche Entrée).
- Ajout de ville dans l'affichage natif (la ville ajoutée passe en premier).
- Tri par température (croissant, décroissant, proximité d'une température cible).
- Pagination (4 cartes par page).
- Graphique comparatif des températures (`recharts`).
- Thème `soft` / `dark` avec persistance.

## Stack technique

- React 19 + Vite
- Axios (requêtes HTTP)
- Recharts (graphique)
- CSS Modules + CSS global
- ESLint

## Installation

1. Installer les dépendances :

```bash
npm install
```

2. Créer un fichier `.env` à la racine :

```env
VITE_WEATHER_API_KEY=votre_cle_openweathermap
```

3. Lancer l'application en développement :

```bash
npm run dev
```

## Scripts disponibles

- `npm run dev` : démarre le serveur de dev.
- `npm run build` : construit la version production.
- `npm run preview` : prévisualise le build.
- `npm run lint` : vérifie la qualité du code.

## Structure du projet

```txt
src/
  App.jsx
  App.css
  index.css
  main.jsx
  hooks/
    useWeatherApp.js
  components/
    SearchBar.jsx
    NativeCityForm.jsx
    SortControls.jsx
    Pagination.jsx
    WeatherCard.jsx
    WeatherChart.jsx
  header/
    navbar/
      Navbar.jsx
```

## Architecture (simple à comprendre)

- `App.jsx` : assemble l'interface (Navbar, barre d'outils, cartes, pagination, graphique).
- `useWeatherApp.js` : contient toute la logique métier :
  - appels API,
  - cache local,
  - tri/filtrage/pagination,
  - handlers d'actions utilisateur.
- `components/*` : composants visuels réutilisables.

Cette séparation permet d'avoir :
- un composant principal court et lisible,
- une logique facilement testable/modifiable.

## Flux de données

1. Au démarrage :
   - lecture `localStorage` si dispo,
   - sinon chargement API des villes par défaut.
2. Recherche :
   - API géocodage (`/geo/1.0/direct`) puis API météo (`/data/2.5/weather`).
3. Ajout natif :
   - API météo pour la ville demandée,
   - insertion en tête dans la liste native.
4. Affichage :
   - filtrage + tri + pagination via `useMemo`.

## Gestion des thèmes

- L'attribut `data-theme` est appliqué sur `document.documentElement`.
- Les variables CSS dans `index.css` pilotent les couleurs.
- Le choix est mémorisé dans `localStorage`.

## Optimisations mises en place

- `useMemo` pour éviter des recalculs inutiles (filtre, tri, pagination).
- `useCallback` pour stabiliser les handlers.
- `React.lazy` + `Suspense` pour charger certains composants à la demande.
- Utilisation de cache local pour accélérer le chargement initial.

## Dépannage rapide

- Message "Clé API manquante" :
  - vérifier `.env` et la variable `VITE_WEATHER_API_KEY`.
- Aucune donnée météo :
  - vérifier la clé API et la connexion Internet.
- Résultat inattendu après modifications :
  - vider `localStorage` du navigateur puis recharger.

## Pistes d'amélioration

- Ajouter des tests unitaires sur le hook `useWeatherApp`.
- Ajouter un mode "système" pour suivre le thème OS.
- Ajouter un bouton pour supprimer une ville native.
- Ajouter un TTL sur le cache (expirer après X minutes).
