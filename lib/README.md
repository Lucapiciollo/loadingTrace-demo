<div align="center">

# ⚡ pl-loading-trace

**The Angular loading overlay you actually want to use.**

Zero boilerplate · 76 built-in animations · HTTP auto-tracking · Router tracking · Named overlays · Determinate progress bars · Runtime config API · Angular Signals

[![npm version](https://img.shields.io/npm/v/pl-loading-trace?color=%233b82f6&style=flat-square)](https://www.npmjs.com/package/pl-loading-trace)
[![Angular](https://img.shields.io/badge/Angular-19%2B-dd0031?style=flat-square&logo=angular)](https://angular.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Bundle size](https://img.shields.io/badge/bundle-pure%20CSS%20animations-blue?style=flat-square)](#7-animation-types)

### 🔴 [Live Interactive Demo →](https://lucapiciollo.github.io/loadingTrace-demo/)

> Try every animation, tweak config live, trigger HTTP / router events — all in the browser.

[![Demo preview](https://lucapiciollo.github.io/loadingTrace-demo/preview.png)](https://lucapiciollo.github.io/loadingTrace-demo/)

<sub>👆 Click the image to open the live demo</sub>

</div>

---

## Table of Contents

- [⚡ pl-loading-trace](#-pl-loading-trace)
    - [🔴 Live Interactive Demo →](#-live-interactive-demo-)
  - [Table of Contents](#table-of-contents)
  - [1. Why pl-loading-trace?](#1-why-pl-loading-trace)
  - [2. Requirements](#2-requirements)
  - [3. Installation](#3-installation)
  - [4. Setup](#4-setup)
    - [4.1 Standalone app (Angular 17+)](#41-standalone-app-angular-17)
    - [4.2 NgModule app](#42-ngmodule-app)
  - [5. Quick start](#5-quick-start)
  - [6. Component inputs](#6-component-inputs)
    - [`source` values](#source-values)
  - [7. Configuration reference](#7-configuration-reference)
    - [7.1 PlLoadingTraceConfig — full reference](#71-plloadingtraceconfig--full-reference)
      - [`position` values](#position-values)
    - [7.2 PlLoadingTraceOptions — split config](#72-plloadingtraceoptions--split-config)
    - [7.3 Config resolution order](#73-config-resolution-order)
  - [8. Animation types](#8-animation-types)
    - [8.1 Indeterminate loaders (53)](#81-indeterminate-loaders-53)
    - [8.2 Determinate progress bars (23)](#82-determinate-progress-bars-23)
  - [9. Services](#9-services)
    - [9.1 PlLoadingStateService](#91-plloadingstateservice)
      - [Members](#members)
    - [9.2 PlLoadingRegistryService](#92-plloadingregistryservice)
      - [Methods — loading control](#methods--loading-control)
      - [Methods — determinate progress](#methods--determinate-progress)
      - [Methods — runtime config override](#methods--runtime-config-override)
  - [10. Runtime config override API](#10-runtime-config-override-api)
    - [Save and restore](#save-and-restore)
    - [Practical use: change animation on the fly](#practical-use-change-animation-on-the-fly)
  - [11. Practical examples](#11-practical-examples)
    - [11.1 Full-screen HTTP spinner](#111-full-screen-http-spinner)
    - [11.2 Router navigation bar](#112-router-navigation-bar)
    - [11.3 HTTP spinner + router bar combined](#113-http-spinner--router-bar-combined)
    - [11.4 Contained card spinner](#114-contained-card-spinner)
    - [11.5 Named overlay — manual control](#115-named-overlay--manual-control)
    - [11.6 Named overlay on a button](#116-named-overlay-on-a-button)
    - [11.7 Determinate progress bar](#117-determinate-progress-bar)
    - [11.8 Dynamic progress with registry](#118-dynamic-progress-with-registry)
    - [11.9 Runtime config change](#119-runtime-config-change)
      - [Save / restore pattern](#save--restore-pattern)
    - [11.10 Label text](#1110-label-text)
    - [11.11 Custom GIF](#1111-custom-gif)
    - [11.12 Debounce (avoid flicker)](#1112-debounce-avoid-flicker)
    - [11.13 Exclude URLs from tracking](#1113-exclude-urls-from-tracking)
    - [11.14 Split http / router config](#1114-split-http--router-config)
    - [11.15 Multiple named cards grid](#1115-multiple-named-cards-grid)
    - [11.16 spinnerOpacity — transparent animation](#1116-spinneropacity--transparent-animation)
  - [12. Exported symbols](#12-exported-symbols)
  - [13. Building \& Publishing](#13-building--publishing)
    - [Build the library](#build-the-library)
    - [Publish to npm](#publish-to-npm)
    - [Run the demo app](#run-the-demo-app)
    - [Run tests](#run-tests)

---

## 1. Why pl-loading-trace?

Most loading libraries make you choose: either a full-screen spinner **or** a progress bar **or** per-component loaders. `pl-loading-trace` does all three, with a single component and a single config.

| Feature | pl-loading-trace | Typical spinner lib |
|---|:---:|:---:|
| HTTP auto-tracking (functional interceptor) | ✅ | ❌ |
| Router navigation tracking | ✅ | ❌ |
| Named overlays (per-card, per-button) | ✅ | ❌ |
| 76 built-in CSS animations | ✅ | ~5 |
| 23 determinate progress bar types | ✅ | ❌ |
| Runtime config override via service | ✅ | ❌ |
| Angular 19 Signals-native | ✅ | ❌ |
| Zero dependencies | ✅ | ✅ |
| Tree-shakeable | ✅ | ⚠️ |

---

## 2. Requirements

| Package | Version |
|---|---|
| `@angular/core` | `^19.2.0` |
| `@angular/common` | `^19.2.0` |
| `@angular/router` | compatible with Angular 19 |

> **Router tracking** requires `provideRouter(routes)` (or `RouterModule`). If your app has no router, set `enableRouterTracer: false`.

---

## 3. Installation

```bash
npm install pl-loading-trace
```

---

## 4. Setup

### 4.1 Standalone app (Angular 17+)

**`app.config.ts`**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { providePlLoadingTrace, plLoadingHttpInterceptor } from 'pl-loading-trace';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([plLoadingHttpInterceptor])),
    providePlLoadingTrace({
      shared: { debounceMs: 200 },
      http:   { animationType: 'spinner', modal: true },
      router: { animationType: 'bar' },
    }),
  ],
};
```

> `plLoadingHttpInterceptor` is a **functional interceptor** (Angular 15+ style).
> For class-based interceptors, use `PlLoadingHttpInterceptor` with `HTTP_INTERCEPTORS`.

### 4.2 NgModule app

**`app.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlLoadingTraceModule, PlLoadingHttpInterceptor } from 'pl-loading-trace';

@NgModule({
  imports: [
    HttpClientModule,
    PlLoadingTraceModule.forRoot({
      shared: { debounceMs: 200 },
      http:   { animationType: 'spinner', modal: true },
      router: { animationType: 'bar' },
    }),
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: PlLoadingHttpInterceptor,
      multi:    true,
    },
  ],
})
export class AppModule {}
```

---

## 5. Quick start

Drop `<pl-loading-overlay>` **once** in your root layout — that's it:

```html
<!-- app.component.html -->

<!-- Top-of-page router bar -->
<pl-loading-overlay source="router" />

<!-- Full-screen HTTP overlay -->
<pl-loading-overlay source="http" />

<router-outlet />
```

Every `HttpClient` request and every router navigation will now trigger the appropriate overlay automatically.

---

## 6. Component inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `source` | `LoadingSource` | `'http'` | Which stream triggers this overlay |
| `contained` | `boolean` | `false` | Fill nearest `position: relative` ancestor instead of the viewport |
| `name` | `string` | `''` | Register in `PlLoadingRegistryService` for manual/imperative control |
| `config` | `Partial<PlLoadingTraceConfig>` | `{}` | Per-instance config (merged over global) |
| `progress` | `number \| null` | `null` | Determinate progress value 0–100 (takes priority over `config.progressValue`) |

### `source` values

| Value | Triggers when… |
|---|---|
| `'http'` | Any tracked `HttpClient` request is pending |
| `'router'` | A router navigation is in progress |
| `'both'` | Either HTTP **or** router is active |
| `'none'` | **Only** via `PlLoadingRegistryService` — fully manual |

---

## 7. Configuration reference

### 7.1 PlLoadingTraceConfig — full reference

All properties are optional. Any omitted key falls back to its default.

| Property | Type | Default | Description |
|---|---|---|---|
| `enableHttpTracer` | `boolean` | `true` | Intercept `HttpClient` requests |
| `enableRouterTracer` | `boolean` | `true` | Track router navigations |
| `animationType` | `AnimationType` | `'spinner'` | CSS animation to display (see §8) |
| `animationSpeed` | `number` | `1000` | Animation cycle duration in ms |
| `position` | `LoadingPosition` | `'center'` | Where to place the spinner (ignored for `bar` type) |
| `modal` | `boolean` | `true` | Show a semi-transparent backdrop |
| `backdropColor` | `string` | `'rgba(0,0,0,0.55)'` | Backdrop background (any CSS color) |
| `backdropBlur` | `number` | `2` | Backdrop `backdrop-filter: blur(Npx)` |
| `color` | `string` | `'#3498db'` | Primary animation color |
| `size` | `number` | `40` | Animation size in px |
| `spinnerOpacity` | `number` | `1` | Animation element opacity 0–1 |
| `barHeight` | `number` | `5` | Track height in px (for `bar` type) |
| `barColorStart` | `string` | _(same as `color`)_ | Gradient start color for `bar` |
| `barColorEnd` | `string` | `'#2ecc71'` | Gradient end color for `bar` |
| `label` | `string` | `''` | Text shown below the animation |
| `labelColor` | `string` | _(auto-contrast)_ | Label color; auto = white on modal, `color` on no-modal |
| `debounceMs` | `number` | `150` | Start-only debounce in ms — requests shorter than this won't show the overlay. Configurable independently per source via `http`/`router` sections. |
| `excludeUrls` | `string[]` | `[]` | URL substrings to skip in HTTP tracking |
| `customGifUrl` | `string` | `''` | GIF/image to use instead of CSS animation |
| `zIndex` | `number` | `9999` | CSS `z-index` |
| `wrapperBg` | `string` | `'transparent'` | Spinner card background |
| `wrapperRadius` | `number` | `12` | Spinner card border-radius in px |
| `wrapperPadding` | `number` | `20` | Spinner card padding in px |
| `progressValue` | `number` | `0` | Determinate progress 0–100 (static, for progress types) |
| `progressSegments` | `number` | `20` | Segment / dot count for segmented progress types |

#### `position` values

```
'center' | 'top' | 'bottom' | 'top-left' | 'top-right'
```

### 7.2 PlLoadingTraceOptions — split config

```typescript
interface PlLoadingTraceOptions {
  shared?: Partial<PlLoadingTraceConfig>; // applied to ALL overlays
  http?:   Partial<PlLoadingTraceConfig>; // HTTP overlays only (overrides shared)
  router?: Partial<PlLoadingTraceConfig>; // router overlays only (overrides shared)
}
```

### 7.3 Config resolution order

From lowest to highest priority — later entries win:

```
DEFAULT_CONFIG
  ← shared
    ← http    (source='http')   ┐
    ← router  (source='router') ┘
  ← [config]  (per-instance input binding, only defined keys)
  ← registry.setConfig / patchConfig  (runtime override — highest priority)
```

Named overlays (`source="none"`) inherit from `shared` only.

---

## 8. Animation types

### 8.1 Indeterminate loaders (53)

All are CSS-only, have transparent backgrounds, and respect `spinnerOpacity` and `animationSpeed`.

| Name | Style | Best for |
|---|---|---|
| `spinner` | Classic rotating ring | HTTP requests |
| `dots` | Three bouncing dots | Routing |
| `bar` | Full-width gradient bar at top | Router navigation |
| `ring-fade` | Segmented ring fading in/out | Dashboard |
| `pulse` | Pulsing expanding circle | Manual trace |
| `ripple` | Two expanding concentric rings | Save action |
| `orbit` | Dot orbiting a center dot | Long task |
| `wave` | Five vertical bars (audio wave) | Sync data |
| `bounce-bar` | Three bars with staggered bounce | Inline card |
| `flip` | Square flipping on 3 axes | Admin panel |
| `square-spin` | Square rotating on multiple axes | Developer tool |
| `chase` | Six dots chasing in a circle | Full overlay |
| `dna` | Two interleaved vertical sine waves | Showcase |
| `ellipsis` | Three dots expanding horizontally | Small widgets |
| `hourglass` | Rotating hourglass shape | Processing |
| `infinity` | Animated figure-eight (∞) | Background sync |
| `meteor` | Comet streaking diagonally | Route change |
| `morph` | Shape-morphing blob | Dashboard card |
| `neon-ring` | Glowing neon spinning ring | Dark mode |
| `skeleton` | Shimmer placeholder bar | Content loading |
| `typing` | Three chat-bubble typing dots | Chat / logs |
| `windmill` | Four-blade windmill | Demo |
| `cube-grid` | 3×3 cubes pulsing in cascade | Grid data |
| `fading-circle` | 12 dots around a clock face | Generic loading |
| `double-ring` | Two concentric rings, opposite directions | Modal overlay |
| `radar` | Radar sweep sector | Network trace |
| `jelly` | Squash-and-stretch blob | Friendly UI |
| `rotate-plane` | Single plane rotating in 3D | Admin action |
| `wandering-cubes` | Two squares orbiting each other | Showcase |
| `grid-fade` | 3×3 grid fading in cascade | Tables |
| `three-bounce` | Three balls bouncing horizontally | Button loading |
| `arc` | SVG arc with animated stroke-dashoffset | Default choice |
| `google-line` | Material-style indeterminate bar | Router top bar |
| `route-progress` | Progressive fill bar | Router navigation |
| `matrix-rain` | Falling code characters | Dark / network |
| `terminal-cursor` | Blinking block cursor | Developer UI |
| `cyber-scan` | Horizontal scan line | Network tracing |
| `liquid-orb` | Liquid blob orbiting | Full overlay |
| `elastic-dots` | Elastically bouncing dots | HTTP loading |
| `gradient-ring` | Ring with conic gradient | Modal loading |
| `data-stream` | Flowing data particles | API calls |
| `network-nodes` | Connected nodes pulsing | Network trace |
| `loading-stripes` | Animated diagonal stripes bar | Progress bar |
| `glitch` | RGB-offset glitch effect | Dark showcase |
| `halo-pulse` | Dot with pulsing halo | Small loading |
| `ios-dots` | iOS-style activity indicator | Inline loading |
| `android-bar` | Material indeterminate bar | Top loading |
| `neon-bars` | Neon equalizer bars | Dark UI |
| `rotating-dashes` | Rotating dashed circle | Generic loading |
| `ping-dot` | Network ping indicator | Network ping |
| `progress-pill` | Animated pill bar | Button / card |
| `angular-orbit` | Angular logo orbital animation | Angular library |
| `copilot-border` | Glowing border that travels the container | AI / Chat box |

### 8.2 Determinate progress bars (23)

These types consume a **progress value 0–100** and render it visually.  
Feed the value via `[progress]` input, `config.progressValue`, or `registry.setProgress(name, value)`.

| Name | Visual | Best for |
|---|---|---|
| `progress-ring` | SVG circular arc fill | File upload |
| `progress-segments` | Rectangular segments ring | Batch operation |
| `progress-dots` | High-density dot ring | Loading stage |
| `progress-bar` | Horizontal fill bar with glow | File upload |
| `progress-striped` | Animated diagonal stripes fill | Long operation |
| `progress-thin` | 3 px NProgress-style line + glowing dot | Page transition |
| `progress-steps` | Horizontal step circles | Wizard / onboarding |
| `progress-blocks` | Vertical equalizer columns | Audio / media |
| `progress-battery` | Battery shape with charging fill | Charge / energy |
| `progress-dial` | Conic-gradient donut with % label | Dashboard metric |
| `progress-level` | Liquid fill circle (bottom→top) | Liquid / fluid |
| `progress-arc` | SVG half-circle speedometer gauge | Speed / score |
| `progress-counter` | Large % number + thin conic ring | KPI / stat card |
| `progress-wave-bar` | Wavy leading-edge fill bar | Liquid / upload |
| `progress-pixel` | LED 10×2 pixel grid | Retro / game UI |
| `progress-clock` | Conic dial + rotating clock hand | Timer / schedule |
| `progress-tower` | Narrow vertical column fill | Storage / capacity |
| `progress-dots-row` | Horizontal row of dot indicators | Step indicator |
| `progress-gradient-ring` | SVG ring with linear-gradient stroke | Profile / avatar |
| `progress-text-fill` | Giant % text filled bottom-up | Score / stat |
| `progress-neon-bar` | Ultra-glow neon bar (multi-layer bloom) | Cyberpunk / game |
| `progress-scan` | Fill bar with scanline on leading edge | Scan / process |
| `progress-split-bar` | Symmetric fill from center outward | Symmetric load |

---

## 9. Services

### 9.1 PlLoadingStateService

Inject this to **manually trigger** the global loading state, or to read the resolved config signals.

```typescript
import { inject } from '@angular/core';
import { PlLoadingStateService } from 'pl-loading-trace';

@Component({ ... })
export class MyComponent {
  private readonly loadingState = inject(PlLoadingStateService);

  async generateReport() {
    this.loadingState.setHttpLoading(true);
    try {
      await this.reportService.generate();
    } finally {
      this.loadingState.setHttpLoading(false);
    }
  }
}
```

#### Members

| Member | Type | Description |
|---|---|---|
| `config` | `Signal<Required<PlLoadingTraceConfig>>` | Resolved shared config |
| `httpConfig` | `Signal<Required<PlLoadingTraceConfig>>` | Resolved HTTP config |
| `routerConfig` | `Signal<Required<PlLoadingTraceConfig>>` | Resolved router config |
| `loading$` | `Observable<boolean>` | Combined HTTP + router stream |
| `httpLoading$` | `Observable<boolean>` | HTTP stream only |
| `routerLoading$` | `Observable<boolean>` | Router stream only |
| `setHttpLoading(v)` | `void` | Manually set HTTP loading state |
| `setRouterLoading(v)` | `void` | Manually set router loading state |

---

### 9.2 PlLoadingRegistryService

Full imperative control over any **named** overlay instance.

```typescript
private readonly registry = inject(PlLoadingRegistryService);
```

#### Methods — loading control

| Method | Signature | Description |
|---|---|---|
| `start` | `(name, label?) => void` | Start loading; optionally set a dynamic label |
| `stop` | `(name) => void` | Stop loading and clear the dynamic label |
| `toggle` | `(name, label?) => void` | Toggle state |
| `isActive` | `(name) => boolean` | Returns current active state (synchronous) |
| `register` | `(name) => Signal<boolean>` | Read-only active signal (used by the component) |
| `registerLabel` | `(name) => Signal<string>` | Read-only label signal |

#### Methods — determinate progress

| Method | Signature | Description |
|---|---|---|
| `setProgress` | `(name, value: 0–100) => void` | Set progress value |
| `resetProgress` | `(name) => void` | Revert to `config.progressValue` |
| `startProgress` | `(name, label?) => void` | `start()` + `setProgress(0)` combined |
| `completeProgress` | `(name, delayMs? = 300) => void` | Set 100%, then stop after delay |
| `registerProgress` | `(name) => Signal<number \| null>` | Read-only progress signal |

#### Methods — runtime config override

> See [§10](#10-runtime-config-override-api) for full details.

| Method | Signature | Description |
|---|---|---|
| `setConfig` | `(name, config) => void` | Replace config override entirely. `label` is routed to the label signal |
| `patchConfig` | `(name, config) => void` | Shallow-merge into existing override. Passing `{ label: '…' }` alone is valid |
| `getConfig` | `(name) => Partial<PlLoadingTraceConfig>` | Snapshot of current override including active label — use to save before a temporary change |
| `resetConfig` | `(name) => void` | Remove all overrides **and** clear the dynamic label (revert to defaults) |
| `registerConfigOverride` | `(name) => Signal<…>` | Read-only override signal (used by component) |

---

## 10. Runtime config override API

Every named overlay can have its config overridden **at runtime** via the registry — independently of the global config and the `[config]` input binding.

The **priority chain** is:

```
Global defaults  ←  [config] input  ←  registry.setConfig / patchConfig
```

The registry always wins. This means you can change any property — including `animationType` — without touching the template.

```typescript
private readonly registry = inject(PlLoadingRegistryService);

// Replace the whole config override (label is routed to the label signal)
registry.setConfig('upload', {
  animationType: 'progress-neon-bar',
  color: '#ef4444',
  size: 80,
  label: 'Uploading…',
});

// Update only specific keys — passing { label } alone is valid
registry.patchConfig('upload', { color: '#10b981' });     // change color only
registry.patchConfig('upload', { label: '2 of 5…' });     // change label only

// Revert to template / global defaults (also clears dynamic label)
registry.resetConfig('upload');
```

### Save and restore

Use `getConfig()` to snapshot the current state before a temporary change so it can be restored exactly:

```typescript
// Save current state
const saved = this.registry.getConfig('status-badge');

// Temporary change
this.registry.patchConfig('status-badge', { color: '#ef4444', label: 'Error!' });

// Restore
this.registry.setConfig('status-badge', saved);
```

`getConfig` returns a `Partial<PlLoadingTraceConfig>` that includes the active `label` key so nothing is lost on restore.

### Practical use: change animation on the fly

```typescript
onUploadStart() {
  this.registry.setConfig('file-task', { animationType: 'progress-bar', color: '#3b82f6' });
  this.registry.startProgress('file-task');
}

onUploadProgress(pct: number) {
  this.registry.setProgress('file-task', pct);
}

onUploadDone() {
  this.registry.patchConfig('file-task', { color: '#22c55e' }); // go green
  this.registry.completeProgress('file-task', 600);
}

onUploadError() {
  this.registry.setConfig('file-task', { animationType: 'spinner', color: '#ef4444' });
  setTimeout(() => this.registry.stop('file-task'), 2000);
}
```

---

## 11. Practical examples

### 11.1 Full-screen HTTP spinner

```html
<!-- app.component.html -->
<pl-loading-overlay source="http" />
<router-outlet />
```

```typescript
providePlLoadingTrace({
  http: {
    animationType: 'spinner',
    color:         '#6c63ff',
    size:          56,
    modal:         true,
    backdropColor: 'rgba(0, 0, 0, 0.6)',
    backdropBlur:  4,
  },
})
```

---

### 11.2 Router navigation bar

```html
<pl-loading-overlay source="router" />
```

```typescript
providePlLoadingTrace({
  router: {
    animationType:  'bar',
    modal:          false,
    barColorStart:  '#6c63ff',
    barColorEnd:    '#ff6584',
    barHeight:      3,
  },
})
```

---

### 11.3 HTTP spinner + router bar combined

```html
<pl-loading-overlay source="router" />
<pl-loading-overlay source="http" />
<router-outlet />
```

```typescript
providePlLoadingTrace({
  shared: { debounceMs: 150 },
  http: {
    animationType: 'cube-grid',
    color:         '#3b82f6',
    modal:         true,
    backdropColor: 'rgba(15, 23, 42, 0.65)',
  },
  router: {
    animationType:  'bar',
    modal:          false,
    barColorStart:  '#818cf8',
    barColorEnd:    '#f472b6',
    barHeight:      4,
  },
})
```

---

### 11.4 Contained card spinner

The overlay fills the nearest `position: relative` ancestor instead of the viewport.

```html
<div style="position: relative; width: 300px; height: 200px;">
  <pl-loading-overlay
    source="http"
    [contained]="true"
    [config]="{ animationType: 'ripple', color: '#10b981', size: 48, modal: false }" />

  <h3>Card title</h3>
  <p>Card content loaded via HTTP</p>
</div>
```

---

### 11.5 Named overlay — manual control

Use `source="none"` so the overlay **only** responds to registry calls.

```html
<div class="product-card" style="position: relative; min-height: 100px;">
  <pl-loading-overlay
    name="save-product"
    source="none"
    [contained]="true"
    [config]="{ animationType: 'dots', color: '#f59e0b', modal: false }" />

  <h4>Product details</h4>
  <button (click)="save()">Save</button>
</div>
```

```typescript
save() {
  this.registry.start('save-product', 'Saving…');
  this.api.saveProduct().subscribe({
    complete: () => this.registry.stop('save-product'),
    error:    () => this.registry.stop('save-product'),
  });
}
```

---

### 11.6 Named overlay on a button

```html
<button style="position: relative; overflow: hidden; min-width: 110px;" (click)="upload()">
  <pl-loading-overlay
    name="upload-btn"
    source="none"
    [contained]="true"
    [config]="{ animationType: 'arc', color: '#fff', size: 18, modal: false, spinnerOpacity: 0.9 }" />
  Upload
</button>
```

```typescript
upload() {
  this.registry.start('upload-btn');
  this.fileService.upload(file).pipe(
    finalize(() => this.registry.stop('upload-btn'))
  ).subscribe();
}
```

---

### 11.7 Determinate progress bar

Static value via `[config]` — useful for declarative templates:

```html
<pl-loading-overlay
  source="none"
  name="install-progress"
  [config]="{
    animationType:  'progress-ring',
    color:          '#3b82f6',
    size:           72,
    modal:          false,
    progressValue:  42
  }" />
```

Or via the `[progress]` input (reactive):

```html
<pl-loading-overlay
  source="none"
  name="install-progress"
  [config]="{ animationType: 'progress-ring', color: '#3b82f6', size: 72, modal: false }"
  [progress]="uploadPercent()" />
```

---

### 11.8 Dynamic progress with registry

```typescript
startUpload() {
  this.registry.startProgress('upload', 'Uploading…');

  this.uploader.progress$.subscribe(pct => {
    this.registry.setProgress('upload', pct);
  });

  this.uploader.complete$.subscribe(() => {
    this.registry.completeProgress('upload', 500); // show 100% for 500ms, then hide
  });
}
```

```html
<pl-loading-overlay
  name="upload"
  source="none"
  [contained]="true"
  [config]="{ animationType: 'progress-bar', color: '#3b82f6', size: 80, modal: false }" />
```

---

### 11.9 Runtime config change

```typescript
// Show as indeterminate spinner while connecting
this.registry.setConfig('ws-status', { animationType: 'pulse', color: '#f59e0b', label: 'Connecting…' });
this.registry.start('ws-status');

// Connection established — switch to green progress ring
this.registry.setConfig('ws-status', { animationType: 'progress-ring', color: '#22c55e', label: 'Syncing…' });

// Change only the label without touching any other property
this.registry.patchConfig('ws-status', { label: 'Live' });

// Revert to template defaults (clears label too)
this.registry.resetConfig('ws-status');
```

#### Save / restore pattern

```typescript
// Save state before a temporary error highlight
const saved = this.registry.getConfig('ws-status');
this.registry.patchConfig('ws-status', { color: '#ef4444', label: 'Reconnecting…' });

// After recovery, restore exact prior appearance
this.registry.setConfig('ws-status', saved);
```

---

### 11.10 Label text

```html
<!-- Static label via [config] input -->
<pl-loading-overlay source="http" [config]="{ label: 'Loading data…', labelColor: '#ffffff' }" />
```

```typescript
// Dynamic label — set on start, cleared automatically on stop
this.registry.start('my-overlay', 'Uploading file 1 of 3…');

// Change label only at any point (no other properties affected)
this.registry.patchConfig('my-overlay', { label: 'Uploading file 2 of 3…' });

// Label via setConfig / patchConfig has the same priority as start(name, label)
// — both route through the same internal label signal
this.registry.patchConfig('my-overlay', { label: 'Almost done…', color: '#10b981' });
```

Auto-contrast rules:
- `modal: true` → label is **white** (readable on dark backdrop)
- `modal: false` → label matches `color` (readable on page background)
- Override with explicit `labelColor` when needed

---

### 11.11 Custom GIF

```html
<pl-loading-overlay
  source="http"
  [config]="{ customGifUrl: '/assets/loading.gif', size: 80 }" />
```

---

### 11.12 Debounce (avoid flicker)

Requests shorter than `debounceMs` will not show the overlay at all. The overlay hides **immediately** when loading stops (start-only debounce). Default is **150 ms**.

`debounceMs` can be set globally via `shared`, or overridden independently per source via the `http` / `router` sections:

```typescript
providePlLoadingTrace({
  shared: { debounceMs: 150 },    // default for both
  http:   { debounceMs: 300 },    // HTTP overlay: only shows for requests > 300 ms
  router: { debounceMs: 0  },     // router bar: appears instantly
})
```

---

### 11.13 Exclude URLs from tracking

```typescript
providePlLoadingTrace({
  http: {
    excludeUrls: ['/api/health', '/api/ping', 'analytics.google.com'],
  },
})
```

---

### 11.14 Split http / router config

```typescript
providePlLoadingTrace({
  shared: {
    enableHttpTracer:   true,
    enableRouterTracer: true,
    debounceMs:         200,
  },
  http: {
    animationType: 'fading-circle',
    color:         '#6366f1',
    size:          52,
    modal:         true,
    label:         'Loading…',
  },
  router: {
    animationType:  'bar',
    modal:          false,
    barColorStart:  '#6366f1',
    barColorEnd:    '#ec4899',
    barHeight:      3,
  },
})
```

---

### 11.15 Multiple named cards grid

```typescript
interface DemoCard {
  name: string;
  type: AnimationType;
  color: string;
  label?: string;
}

@Component({ ... })
export class DashboardComponent {
  readonly registry = inject(PlLoadingRegistryService);

  readonly cards: DemoCard[] = [
    { name: 'card-users',    type: 'spinner',       color: '#3b82f6', label: 'Loading users…' },
    { name: 'card-orders',   type: 'dots',          color: '#f59e0b' },
    { name: 'card-products', type: 'cube-grid',     color: '#10b981' },
    { name: 'card-stats',    type: 'fading-circle', color: '#ec4899' },
  ];

  start(card: DemoCard, ms = 3000) {
    this.registry.start(card.name, card.label);
    setTimeout(() => this.registry.stop(card.name), ms);
  }
}
```

```html
<div class="cards-grid">
  @for (card of cards; track card.name) {
    <div class="card">
      <pl-loading-overlay
        [name]="card.name"
        source="none"
        [contained]="true"
        [config]="{ animationType: card.type, color: card.color, modal: false }" />

      <h4>{{ card.name }}</h4>
      <button (click)="start(card)">▶ Start</button>
      <button (click)="registry.stop(card.name)">■ Stop</button>
    </div>
  }
</div>
```

```scss
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.card {
  position: relative; /* required for [contained]="true" */
  min-height: 130px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1rem;
}
```

---

### 11.16 spinnerOpacity — transparent animation

```html
<!-- Semi-transparent neon ring on a blurred backdrop -->
<pl-loading-overlay
  source="http"
  [config]="{
    animationType:  'neon-ring',
    spinnerOpacity: 0.6,
    modal:          true,
    backdropColor:  'rgba(0, 0, 0, 0.4)'
  }" />

<!-- Ghost shimmer — no backdrop, partially transparent skeleton -->
<pl-loading-overlay
  source="http"
  [contained]="true"
  [config]="{
    animationType:  'skeleton',
    spinnerOpacity: 0.35,
    modal:          false
  }" />
```

---

## 12. Exported symbols

| Symbol | Kind | Description |
|---|---|---|
| `providePlLoadingTrace` | `function` | Standalone provider factory |
| `PlLoadingTraceModule` | `NgModule` | For NgModule apps (`forRoot(options)`) |
| `PlLoadingOverlayComponent` | `Component` | The overlay component |
| `PlLoadingStateService` | `Injectable` | Global loading state + config signals |
| `PlLoadingRegistryService` | `Injectable` | Named overlay control + progress + runtime config |
| `PlLoadingHttpInterceptor` | `Injectable` | Class-based HTTP interceptor |
| `plLoadingHttpInterceptor` | `HttpInterceptorFn` | Functional HTTP interceptor |
| `PlRoutingTrackerService` | `Injectable` | Router navigation tracker |
| `PL_LOADING_TRACE_CONFIG` | `InjectionToken` | Config injection token |
| `PL_LOADING_TRACE_DEFAULT_CONFIG` | `const` | Default config values |
| `PlLoadingTraceConfig` | `interface` | Full config interface |
| `PlLoadingTraceOptions` | `interface` | Split config interface |
| `AnimationType` | `type` | Union of all 74 animation names |
| `AnimationSpeed` | `type` | `number` (ms) |
| `LoadingPosition` | `type` | `'center' \| 'top' \| 'bottom' \| 'top-left' \| 'top-right'` |
| `LoadingSource` | `type` | `'http' \| 'router' \| 'both' \| 'none'` |

---

## 13. Building & Publishing

### Build the library

```bash
npx ng build pl-loading-trace
```

Build artifacts land in `dist/pl-loading-trace/`.

### Publish to npm

```bash
cd dist/pl-loading-trace
npm publish
```

### Run the demo app

```bash
npm start          # development server → http://localhost:4200
npm run build      # production build
npm run deploy:demo # deploy to GitHub Pages
```

### Run tests

```bash
ng test
```

---

<div align="center">

Made with ❤️ by [Luca Piciollo](https://github.com/lucapiciollo) · MIT License

</div>
