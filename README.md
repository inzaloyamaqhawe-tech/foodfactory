# Food Factory Silverlakes Website

React + Vite project for the Food Factory Silverlakes website.

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

This project is configured with a relative Vite base path:

- `./`

This is resilient for GitHub Pages and avoids blank/white screens caused by broken asset URLs.

After pushing to `main`, the included GitHub Actions workflow deploys `dist` to GitHub Pages automatically.
