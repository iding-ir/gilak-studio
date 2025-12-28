# Gilak Studio

Gilak Studio is a TypeScript monorepo of reusable React UI components, canvas tools, utilities, and a demo app.

## Overview

This repository contains component libraries, design-system utilities, and an example application used to prototype and demo features. It's organized as a pnpm workspace to develop, build, and test packages together.

## Tech stack

- Monorepo: `pnpm` workspaces, `turbo` (task running)
- Language: `TypeScript`, `SCSS`
- UI: `React`
- Bundler/Dev: `Vite`
- Linting & Formatting: `ESLint`, `Prettier`
- Release & Changelog: `Changesets`
- Others: `Husky`, `Storybook`, `i18Next`

## Workspace packages

- `@gilak/stylist` — Design tokens, themes, SCSS utilities.
- `@gilak/components` — Reusable UI components.
- `@gilak/canvas` — React canvas utilities and components.
- `@gilak/floating-window` — Draggable/resizable floating window UI.
- `@gilak/color-picker` — Canvas-based color picker.
- `@gilak/color-swatch` — Color swatch.
- `@gilak/resizable-screen` — Resizable / zoomable screen container.
- `@gilak/utils` — Shared utility functions.
- `@gilak/localization` — i18n helpers and locales.
- `@gilak/build-config` — Shared Vite / build configuration for packages.
- `apps/demo` — Example/demo application showcasing the components.

## Quick start

1. Bootstrap dependencies:

```
pnpm install
```

2. Start the demo app locally:

```
pnpm dev
```

3. Build all packages:

```
pnpm build
```

4. Lint:

```
pnpm lint
```

5. Format:

```
pnpm format
```
