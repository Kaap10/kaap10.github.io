# Vardhman's Wiki

A personal knowledge base built with [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server at `http://localhost:3000/`. Most changes are reflected live without restarting the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory, which can be served using any static hosting service.

## Deployment

Deploy to GitHub Pages using:

```bash
npm run deploy
```

## Project Structure

- `docs/`: Markdown documentation files
- `blog/`: Blog posts (currently disabled)
- `src/`: React components and pages
- `static/`: Static assets like images
- `docusaurus.config.js`: Site configuration
- `sidebars.js`: Documentation sidebar configuration

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
