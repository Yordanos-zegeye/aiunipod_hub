# AI UNIPOD Hub (Ethiopia)

**AI UNIPOD Ethiopia** is a national center of excellence and living lab anchored at the Ethiopian Artificial Intelligence Institute (EAII) in collaboration with Addis Ababa University (AAU) and the UNDP **timbuktoo** initiative.

This fullstack application features venture incubation, investor deal flow pipelines, founder portals, an administrative console, and white-label tenant theming.

---

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) with fullstack SSR & type-safe routing
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Caching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + OKLCH Design Tokens + [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vite.dev/)

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v24)
- npm 10+

### Installation

```bash
npm install
```

### Running Locally (Development)

To run the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be available at **`http://localhost:3000/`** (or `http://localhost:5173/`).

### Production Build

To build the client and server bundles:

```bash
npm run build
```

The build outputs:
- `dist/client/`: Static assets and client hydration bundle
- `dist/server/`: Server-side rendering (SSR) entry bundle

---

## Application Routes

- **`/`**: Landing page with 3D interactive stage, living lab statistics, institutional partners (EAII, AAU, UNDP), and venture directory.
- **`/startups`**: Searchable and filterable venture directory across health AI, agritech, computer vision, and NLP.
- **`/$startupSlug`**: White-label startup profile pages with custom live branding (colors, typography, radii).
- **`/jobs`**: Venture career board, fellowship openings, and job posting modal.
- **`/cohort-3`**: Cohort 3 incubation program details and multi-step founder application form.
- **`/investor`**: Investor deal pipeline, startup metrics, and diligence request workspace.
- **`/portal`**: Startup founder portal for managing profiles, metrics, and white-label themes.
- **`/admin`**: Super admin console with audit logging, role delegation, and venture approvals.
- **`/login`**: Multi-role authentication & demo role switcher.
