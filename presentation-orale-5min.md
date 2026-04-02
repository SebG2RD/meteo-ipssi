# Présentation orale — 5 minutes (plan slide par slide)

**Note :** nous étions **trois** sur ce projet — parlez au **nous** à l’oral (équipe), pas au **je**.

---

## Slide 1 — Titre et contexte (30 s)

**Titre :** TP React avancé — Dashboard météo  

**Message clé :** « **Nous avons réalisé** une application React qui interroge OpenWeatherMap et propose une interface complète : recherche mondiale, filtre par pays, tri, pagination, graphique et thème clair / sombre, avec une UI basée sur shadcn/ui. »

**À dire à l’oral :**

- **Nous** étions trois sur ce travail ; chacun a pu contribuer sur des parties du code et de l’interface.
- Stack : **React 19**, **Vite**, **Tailwind** et composants **shadcn/ui**.
- Objectif : allier **notions avancées** (API, état, perf) et **expérience utilisateur** soignée.

---

## Slide 2 — Objectifs du projet (35 s)

**Message clé :** « Le projet combine apprentissage technique et produit utilisable. »

**Points à afficher :**

- Appels HTTP avec **axios** (météo + géocodage).
- Données riches affichées en **composants** (cartes, graphique).
- **Filtres** : texte + **pays** (codes ISO présents dans les données).
- **Tri**, **pagination**, **Recharts**.
- **Optimisation** : `useMemo`, `useCallback`, **lazy loading** de certains modules.

**À dire à l’oral :**

- **Nous** sommes allés au-delà du minimum du TP grâce au filtre pays et à la couche UI professionnelle.

---

## Slide 3 — Fonctionnalités principales (45 s)

**Message clé :** « L’app couvre un parcours utilisateur cohérent du chargement à l’analyse. »

**Points à afficher :**

- **8 villes** au démarrage + **localStorage** pour accélérer le retour sur la page.
- Recherche **monde** (validation **Entrée**).
- **Filtre pays** (liste dérivée des villes affichées).
- Ajout d’une ville au **jeu natif** (en tête + sauvegarde cache).
- **Grille 2 × 2** pleine largeur pour les cartes (alignée avec le reste de la page).
- Thème **clair / sombre** mémorisé.

**À dire à l’oral :**

- Vider la recherche ramène à la liste **native** sans cumuler les résultats de recherche.

---

## Slide 4 — Architecture du code (50 s)

**Message clé :** « Code découpé pour rester lisible et maintenable. »

**À afficher :**

- `App.jsx` : **orchestration** (peu de logique).
- `useWeatherApp.js` : **API**, cache, filtres, tri, pagination, thème.
- `components/` : barre de recherche, **CountryFilter**, cartes, graphique…
- `components/ui/` : **shadcn/ui** (Button, Card, Select, etc.).

**Extrait court :**

```jsx
const {
  countryFilter,
  availableCountries,
  sorted,
  paginated,
  handleCountryFilterChange,
} = useWeatherApp();
```

**À dire à l’oral :**

- Un **hook** central évite un `App.jsx` de plusieurs centaines de lignes.

---

## Slide 5 — Exemple technique : API (55 s)

**Message clé :** « La recherche mondiale = géocodage puis météo. »

**À afficher :**

1. `GET .../geo/1.0/direct` — candidats (ville, pays…).
2. `GET .../data/2.5/weather` — détail par lat/lon.

**Extrait court :**

```jsx
const geoResponse = await axios.get(
  "https://api.openweathermap.org/geo/1.0/direct",
  { params: { q: query, limit: 8, appid: API_KEY } },
);
```

**À dire à l’oral :**

- Le filtre **pays** s’applique côté client sur `sys.country` après chargement des données.

---

## Slide 6 — UI (shadcn) et performance (45 s)

**Message clé :** « UX cohérente + chargement raisonnable. »

**À afficher :**

- **shadcn/ui** + **Tailwind** : formulaires, cartes, **Select** pour le pays, états de chargement (Skeleton).
- Thème **dark** sur `<html>` pour variables CSS du design system.
- `useMemo` sur la liste filtrée / triée (dépendances : données, recherche, **pays**, tri).
- `React.lazy` + `Suspense` pour pagination, tri avancé, graphique.

**À dire à l’oral :**

- Moins de CSS custom ; le graphique reste la partie la plus lourde, chargée à la demande.

---

## Slide 7 — Bilan et perspectives (40 s)

**Message clé :** « Projet abouti, structuré, ouvert aux extensions. »

**Bilan :**

- Fonctionnalités TP + **filtre pays** + **UI shadcn**.
- Séparation hook / vues ; lint et build au vert.

**Perspectives :**

- TTL sur le cache ; suppression d’une ville du jeu natif.
- Tests sur `useWeatherApp` ; noms de pays lisibles (FR → France) via une petite table.

**Phrase de conclusion :**

« Ce projet **nous** a permis de consolider React sur un cas concret : API, état, filtres, design system et bonnes pratiques de performance. »
