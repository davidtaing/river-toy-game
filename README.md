# River Toy Game Calc

## Background

I recently had the chance to use jotai, a Reactive State Management Library for React at work.
And I wanted to continue exploring the library with a side-project.

This project will be building a Poker Toy Game Calculator based on one of my old Google Sheets.

See: [River Toy Game Calc - Google Sheets](https://docs.google.com/spreadsheets/d/1OFHF0vtWhu2yt0ztiA60lyAS4bcsM2BD/edit?usp=sharing&ouid=116881968134693048130&rtpof=true&sd=true)

## Tech

- Next.js - just grabbed something that I'm familiar with. Easy to deploy. And good enough to house the calculator which will be frontend only.
- Jotai - reactive state management. When I think Reactive State, I think spreadsheets. So I think this will be a great fit because we'll be porting a spreadsheet.
- Tailwind - came with the Next.js install, so we'll just roll with that.
- GH Actions / Workflows: these will handle the CI steps of linting, testing and building

## Getting Started

### Installing Dependencies

This project uses pnpm as it's package manager. If install pnpm if it has not been installed yet.

```bash
npm i -g pnpm
```

Then to install the npm packages, run

```bash
pnpm i
```

### npm scripts

```bash
pnpm dev # runs dev server
pnpm test # runs tests via vitest
pnpm lint # runs linter
pnpm build # builds project
pnpm start # starts production server - requires the project to be built via previous script
```

See the [package.json file](package.json) for the full list of npm scripts.

## Deployment

Deployment is handled by GitHub Actions Workflows instead of Vercel's default git integration. This allows us to avoid deploying when the codebase does not pass linting, testing or building.

See the [Workflows Folder](.github/workflows/) for more information
