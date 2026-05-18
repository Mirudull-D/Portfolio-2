# Mirudull Portfolio

Personal portfolio with Riso print-inspired design, blending retro print textures and digital glitch interactions.

## Design Theme
- **Colors**: Riso cyan/yellow/red/green, light parchment (`#F0EDE6`) / deep dark (`#0E0E0E`) bases
- **Typography**: `Bebas Neue` (display) + `Space Mono` (monospace)
- **Texture**: Fixed grain overlay for tactile Riso print feel
- **Interactions**: Slide-strike hovers, misregistration effects, keyboard easter eggs (`INVERT`, `404`, `RAIN`)

## Project Structure
```
src/
├── main.jsx                # Entry point
├── App.jsx                 # Main app
├── index.css               # Global styles + theme vars
├── assets/                 # Static assets
├── hooks/                  # Custom hooks (useScrollReveal)
└── components/             # UI components (Hero, About, Work, Stack, EasterEggs, etc.)
```

## Getting Started

### Prerequisites
Node.js (v18+), npm

### Install
```bash
npm install
```

### Run
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview build |


## Tech Stack
React 19, Vite 8, CSS Modules, react-github-calendar
