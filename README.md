# Disney Stars

**Live site:** _coming soon_

Browse, search and explore Disney characters — filter by TV show, view film stats, and export data.

## Features

- **Search** by character name (debounced) or TV show
- **Multi-show filtering** — add multiple TV show chips to find characters that appear across shows
- **Clickable TV show chips** in the character modal — click any show to jump straight to that filter
- **Sort** characters by name (ascending / descending)
- **Pagination** with configurable page size
- **Character modal** — image, TV shows, and video games for each character
- **Films pie chart** — top 30 characters by film count, with optional short films toggle
- **Export to XLSX** — download the current character list as a spreadsheet
- **Dark mode** — toggle via the header switch
- **Accessible** — keyboard navigation, ARIA labels, focus management, sufficient contrast ratios

## Tech Stack

| Area | Library |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| State / Data fetching | Redux Toolkit + RTK Query |
| Charts | Highcharts 12 |
| Excel export | xlsx |
| Testing | Vitest + Testing Library + MSW |

## Getting Started

```bash
npm install   # or bun install / pnpm install / yarn
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `dev` | Start development server |
| `build` | Type-check and build for production |
| `preview` | Preview the production build locally |
| `test` | Run unit tests once |
| `test:watch` | Run tests in watch mode |

## Data Source

All character data is fetched from the [Disney API](https://disneyapi.dev) — a free, public REST API.

## Project Structure

```
src/
├── api/          # RTK Query API slice + regex escape util
├── components/   # UI components
├── hooks/        # Typed Redux hooks + useDebounce
├── store/        # Redux slices (filters, modal, theme)
├── types/        # TypeScript interfaces
├── utils/        # XLSX export helper
└── __tests__/    # Unit tests
```
