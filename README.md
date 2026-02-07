# Save The Poop

A playful, kid-friendly mini-site with multiple interactive pages and games.

## Features

- Home hub with quick game launch cards
- `Cool Stuff` arcade with multiple mini-games
- `Pee Lazy River` action game with power-ups and mobile float controls
- `Watch the Game` soccer-style simulation with cheers and boosts
- Additional fun pages: map, poop land, world poops, news

## Tech Stack

- Plain HTML, CSS, and JavaScript
- No build step required

## Run Locally

From the project root:

```bash
python3 -m http.server 8000
```

Open:

- `http://localhost:8000`

## Main Pages

- `/index.html` - Home
- `/pages/game.html` - Cool Stuff (arcade)
- `/pages/lazy-river.html` - Pee Lazy River
- `/pages/watch.html` - Watch the Game
- `/pages/map.html`
- `/pages/poop-land.html`
- `/pages/world-poops.html`
- `/pages/news.html`

## Kid/Mobile Controls

- Arcade games support tap-first controls and mobile-friendly layouts.
- Lazy River:
  - Tap game area or hold the `Hold to Float` button to rise.
- Watch Game:
  - Use boost buttons and tap the field to add a quick cheer.

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── pages/
    ├── page-styles.css
    ├── game.html
    ├── lazy-river.html
    ├── watch.html
    ├── map.html
    ├── poop-land.html
    ├── world-poops.html
    └── news.html
```

## Notes

- Best tested on modern mobile and desktop browsers.
- Uses `localStorage` for high scores and some game progress.
