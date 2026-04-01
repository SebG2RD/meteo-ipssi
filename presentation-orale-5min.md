# Presentation orale - 5 minutes (plan slide par slide)

## Slide 1 - Titre et contexte (30 sec)

**Titre :** TP React Avance - Dashboard Meteo  
**Message cle :** "J'ai construit une application React qui consomme une API meteo et propose une interface complete (recherche, tri, pagination, graphique, theme)."

**A dire a l'oral :**
- Le projet est base sur React + Vite.
- L'objectif est de pratiquer des notions avancees de front-end.
- J'ai aussi travaille l'architecture et l'optimisation.

---

## Slide 2 - Objectifs du projet (35 sec)

**Message cle :** "Le projet combine apprentissage technique et besoins utilisateur."

**Points a afficher :**
- Appel API externe avec `axios`
- Affichage de donnees complexes via composants
- Recherche mondiale de villes
- Pagination + tri + graphique
- Optimisation (memoization + lazy loading)

**A dire a l'oral :**
- J'ai voulu aller au-dela du minimum en ajoutant une vraie experience utilisateur.

---

## Slide 3 - Fonctionnalites principales (45 sec)

**Message cle :** "L'application couvre tout le cycle d'usage."

**Points a afficher :**
- 8 villes chargees au demarrage
- Cache localStorage pour accelerer le chargement
- Recherche sur Entree (villes mondiales)
- Ajout de ville native (affichee en premier)
- Theme Soft / Dark

**A dire a l'oral :**
- Si l'utilisateur vide la recherche, on revient proprement a l'affichage natif.
- Les cartes gardent une largeur cohérente pour un rendu propre.

---

## Slide 4 - Architecture du code (50 sec)

**Message cle :** "J'ai decompose le projet pour qu'il reste maintenable."

**A afficher :**
- `App.jsx` : orchestration de l'interface
- `hooks/useWeatherApp.js` : logique metier (API, cache, tri, pagination, handlers)
- `components/*` : composants UI reutilisables

**Extrait court :**
```jsx
const {
  loading, error, paginated, sorted,
  handleSearch, handleAddNativeCity
} = useWeatherApp();
```

**A dire a l'oral :**
- Cette separation rend `App.jsx` plus court et plus lisible.

---

## Slide 5 - Exemple technique API (55 sec)

**Message cle :** "La recherche mondiale se fait en deux etapes."

**A afficher :**
1. Geocodage (`/geo/1.0/direct`)  
2. Meteo detaillee (`/data/2.5/weather`)

**Extrait court :**
```jsx
const geoResponse = await axios.get(
  "https://api.openweathermap.org/geo/1.0/direct",
  { params: { q: query, limit: 8, appid: API_KEY } }
);
```

**A dire a l'oral :**
- Cette approche permet de rechercher des villes partout, pas seulement une liste fixe.

---

## Slide 6 - Performance et qualite (45 sec)

**Message cle :** "J'ai optimise pour garder une app fluide."

**A afficher :**
- `useMemo` pour filtrage/tri/pagination
- `useCallback` pour stabiliser les handlers
- `React.lazy` + `Suspense` pour charger certains composants a la demande
- `npm run lint` et `npm run build` pour valider la qualite

**A dire a l'oral :**
- Le lazy loading allege le chargement initial.
- La memoization evite des recalculs inutiles.

---

## Slide 7 - Bilan et perspectives (40 sec)

**Message cle :** "Le projet est fonctionnel, structure, et evolutif."

**Bilan :**
- Fonctionnalites completees
- UX amelioree (theme, ajout natif, recherche fiable)
- Code mieux organise

**Perspectives :**
- Ajouter suppression de ville native
- Ajouter TTL sur le cache
- Ajouter tests unitaires sur `useWeatherApp`

**Conclusion orale (phrase finale) :**
"Ce projet m'a permis de consolider React sur un cas concret, en combinant logique metier, UI, optimisation et qualite de code."
