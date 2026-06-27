# loadingTrace-demo

[![npm](https://img.shields.io/npm/v/pl-loading-trace.svg)](https://www.npmjs.com/package/pl-loading-trace)
[![Live demo](https://img.shields.io/badge/demo-live-4f46e5.svg)](https://lucapiciollo.github.io/loadingTrace-demo/)

Public **build artifacts** and **live demo** for [`pl-loading-trace`](https://www.npmjs.com/package/pl-loading-trace) —
an Angular loading-overlay library with 70+ CSS animations, HTTP & router auto-tracking,
named overlays, determinate progress bars and a runtime config API built on Angular Signals.

> The library source lives in a separate private repository. **This repo only hosts compiled
> output and is regenerated automatically — do not edit files here by hand.**

## Live demo

[**https://lucapiciollo.github.io/loadingTrace-demo/**](https://lucapiciollo.github.io/loadingTrace-demo/)

Interactive studio to browse every animation, tweak colors, speed, size, progress and
position, and copy the matching `providePlLoadingTrace(...)` configuration.

## Repository layout

| Folder  | Contents                                                                    |
| ------- | --------------------------------------------------------------------------- |
| `lib/`  | Compiled npm package output (FESM bundle + type definitions).               |
| `docs/` | Production build of the demo app, served by GitHub Pages.                   |

## Using the library

Install from npm (this is the recommended way to consume the library):

```bash
npm install pl-loading-trace
```

Register it in your application config:

```ts
import { providePlLoadingTrace, plLoadingHttpInterceptor } from 'pl-loading-trace';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptors([plLoadingHttpInterceptor])),
    providePlLoadingTrace({
      shared: { enableHttpTracer: true, enableRouterTracer: true },
      http:   { animationType: 'spinner', color: '#4f46e5' },
    }),
  ],
};
```

Drop the overlay anywhere in your template:

```html
<pl-loading-overlay />
```

See the [package on npm](https://www.npmjs.com/package/pl-loading-trace) for the full API.

## How this repo is generated

Both folders are produced by the `deploy:demo` script in the source repository:

```bash
npm run deploy:demo
```

It builds the library and the demo in production mode, then commits the compiled
output here and publishes `docs/` through GitHub Pages
(branch `main`, folder `/docs`).

---

- Package version: **1.0.12**
- Last updated: **2026-06-27**
- License: MIT
