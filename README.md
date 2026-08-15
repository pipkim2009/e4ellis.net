# E4Ellis.net

Personal site for Ellis Mark Hughes, built with React + Vite and deployed to GitHub Pages under a custom domain.

## Stack

- React 19 + React Router (`HashRouter`, so client-side routes survive a static GitHub Pages deploy without a server rewrite rule)
- Vite 6 for dev/build tooling
- Plain CSS (`src/index.css`), theme-able via CSS custom properties for light/dark mode
- ESLint (flat config) with `eslint-plugin-react-hooks` / `eslint-plugin-react-refresh`

## Project structure

```
public/assets/       static files served as-is (images, gifs, json, CNAME)
src/components/      shared UI: Header, Footer, Hero, Projects, ProjectMenu
src/pages/           one component per route: Home, Blackjack, MusicTools
src/App.jsx          route table
src/Layout.jsx        shared page shell (Header/Footer + <Outlet/>)
src/*.js             plain logic modules (blackjack.js, timer.js)
```

## Scripts

```
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # eslint
npm run deploy    # build + publish dist/ to the gh-pages branch
```

## Pages

- `/` — home, project index
- `/blackjack` — playable blackjack
- `/music-tools` — fretboard and chord-shape drill generators
