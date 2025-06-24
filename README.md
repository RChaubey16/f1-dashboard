# F1 Dashboard

A modern, visually appealing Formula 1 dashboard built with Next.js and TypeScript. This project displays F1 driver, team, and race data in an interactive and user-friendly interface.

## Features

- **Current Standings:** View up-to-date driver and constructor standings.
- **Grand Prix Cards:** Explore details for each Grand Prix, including circuit info and country flags.
- **Driver & Team Logos:** Instantly recognize drivers and teams with custom SVG logos.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Reusable Components:** Modular React components for easy maintenance and scalability.

## Project Structure

```
├── app/                # Next.js app directory (pages, layout, global styles)
├── components/         # Reusable React components (cards, tables, logos, etc.)
├── public/             # Static assets (SVGs for circuits, drivers, flags, teams)
├── utils/              # Helper functions and data (JSON, TypeScript helpers)
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
├── next.config.ts      # Next.js configuration
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn if preferred)

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

### Building for Production

```bash
pnpm build
pnpm start
```

## Customization
- Add or update SVGs in the `public/` directory for new drivers, teams, or circuits.
- Modify or extend components in `components/` to add new features.
- Update data in `utils/data.json` as needed.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---

*Made with ❤️ for F1 fans.*
