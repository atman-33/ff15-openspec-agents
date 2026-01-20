# Block Breaker

A simple block breaker game built with Vite, TypeScript, React, and React Router v7.

## Features

- Canvas-based game loop (60 FPS target)
- Paddle control with left/right arrow keys
- Ball reflection on walls, paddle, and blocks
- Game Over and Clear states
- Space key to restart after finishing

## Requirements

- Node.js 20+
- npm 9+

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (default: http://localhost:5173/).

## Build

```bash
npm run build
```

## Preview build

```bash
npm run preview
```

## Tests

```bash
npm run test
```

## Controls

- Move left: Left Arrow
- Move right: Right Arrow
- Restart after Game Over/Clear: Space

## GitHub Pages Deployment

This project is deployed via GitHub Actions in `.github/workflows/deploy.yml`.

### Important

- `vite.config.ts` sets `base` to `/ff15-openspec-agents/` for GitHub Pages.
- If you fork or rename the repository, update the `base` value accordingly.
- Update the `homepage` field in `package.json` to match your GitHub Pages URL.

### Deploy Steps

1. Push to the `main` branch.
2. GitHub Actions builds and deploys the `block-breaker/dist` output to Pages.
3. Enable GitHub Pages in repository settings using `GitHub Actions` as the source.
