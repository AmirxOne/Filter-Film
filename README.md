# 🎬 Filter-Film

A Filimo-style **movie & series filter component** — pure HTML/CSS/JS, zero dependencies.

## Demo

👉 https://amirxone.github.io/Filter-Film/

## What it is

A filter bar that lets users narrow down movies and series by:

- **Type** — Movies / Series
- **Genre** — 12 genres (Action, Comedy, Documentary, Animation, …)
- **Country** — 14 countries
- **Language** — Dubbed in Persian / Original language
- **Age rating** — under 3 / 6 / 12 / 15 / 18 years
- **HD** — quality toggle

## Features

- ⚡ **Zero dependencies** — vanilla JS (~100 lines), no jQuery
- 🖥️ **Responsive** — desktop → tablet → mobile (inline expand on small screens)
- ⌨️ **Accessible** — full keyboard support (arrows, Home/End, Esc), ARIA `listbox` pattern, visible focus rings
- 👆 Closes on outside click or <kbd>Esc</kbd>; only one menu open at a time
- 🎞️ Smooth open/close animation (respects `prefers-reduced-motion`)
- 🇮🇷 IRANYekan font embedded

## Usage

Just open `index.html`, or serve the folder statically:

```bash
npx serve .
```

## Structure

```
├── index.html      # markup — 5 dropdown filters + HD switch + action button
├── css/style.css   # styling, responsive breakpoints
├── js/app.js       # dropdown logic (open/close/select/keyboard)
└── font/           # IRANYekan
```

## License

MIT © AmirxOne
