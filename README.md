# Gilak Studio

A monorepo of React component packages for Gilak Studio, built with Vite, TypeScript, and Turborepo.

## Packages

## Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run demo app
pnpm dev

# Run Storybook
pnpm storybook
```

## Development Workflow

### Making Changes

1. Make your changes to packages
2. Create a changeset: `pnpm changeset`
3. Commit your changes including the changeset file

### Releasing

1. Version packages: `pnpm version-packages`
2. Commit version changes
3. Publish: `pnpm release`

## Project Structure

```
gilak-studio/
├── apps/
│   └── demo/                    # Demo application
├── packages/
│   ├── build-config/            # Shared build configuration
│   ├── gilak-color-picker/      # Canvas component package
│   └── gilak-eyedropper/        # Eyedropper component package
├── .storybook/                  # Storybook configuration
└── tsconfig.base.json           # Shared TypeScript configuration
```

## Tech Stack

- **Build**: Vite, TypeScript
- **Monorepo**: Turborepo, pnpm workspaces
- **Versioning**: Changesets
- **Documentation**: Storybook

## License

MIT [Aydin Ghane Kh.](https://github.com/iding-ir)
