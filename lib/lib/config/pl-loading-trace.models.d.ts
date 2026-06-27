/**
 * Cardinal positions where the loading overlay can appear.
 * - center:     centered on screen (default)
 * - top:        top-center
 * - bottom:     bottom-center
 * - top-left:   top-left corner
 * - top-right:  top-right corner
 */
export type LoadingPosition = 'center' | 'top' | 'bottom' | 'top-left' | 'top-right';
/**
 * Built-in CSS animation types.
 *
 * Classic:
 * - spinner        rotating ring
 * - dots           three bouncing dots
 * - bar            full-width progress bar (top of viewport)
 *
 * New elegant (transparent background):
 * - ring-fade      segmented ring that fades in/out
 * - pulse          pulsing circle
 * - ripple         expanding ripple rings
 * - orbit          two orbiting dots
 * - wave           five-bar audio-wave
 * - bounce-bar     three bars with staggered bounce
 * - flip           flipping square
 * - square-spin    rotating filled square
 * - chase          six dots chasing in a circle
 * - dna            two interleaved vertical waves
 * - ellipsis       three dots expanding horizontally
 * - hourglass      rotating hourglass shape
 * - infinity       figure-eight / infinity symbol
 * - meteor         comet streaking across
 * - morph          shape-morphing blob
 * - neon-ring      glowing neon ring
 * - roaming-shadow soft blurred shadow wandering the screen on a random path
 * - skeleton       shimmering placeholder bar
 * - typing         typing indicator (three dots)
 * - windmill       four-blade windmill
 */
export type AnimationType = 'spinner' | 'dots' | 'bar' | 'ring-fade' | 'pulse' | 'ripple' | 'orbit' | 'wave' | 'bounce-bar' | 'flip' | 'square-spin' | 'chase' | 'dna' | 'ellipsis' | 'hourglass' | 'infinity' | 'meteor' | 'morph' | 'neon-ring' | 'skeleton' | 'typing' | 'windmill' | 'cube-grid' | 'fading-circle' | 'double-ring' | 'radar' | 'jelly' | 'rotate-plane' | 'wandering-cubes' | 'grid-fade' | 'three-bounce' | 'arc' | 'google-line' | 'route-progress' | 'matrix-rain' | 'terminal-cursor' | 'cyber-scan' | 'liquid-orb' | 'elastic-dots' | 'gradient-ring' | 'data-stream' | 'network-nodes' | 'loading-stripes' | 'glitch' | 'halo-pulse' | 'ios-dots' | 'android-bar' | 'neon-bars' | 'rotating-dashes' | 'ping-dot' | 'progress-pill' | 'copilot-border' | 'angular-orbit' | 'roaming-shadow' | 'progress-ring' | 'progress-segments' | 'progress-dots' | 'progress-bar' | 'progress-striped' | 'progress-thin' | 'progress-steps' | 'progress-blocks' | 'progress-battery' | 'progress-dial' | 'progress-level' | 'progress-arc' | 'progress-counter' | 'progress-wave-bar' | 'progress-pixel' | 'progress-clock' | 'progress-tower' | 'progress-dots-row' | 'progress-gradient-ring' | 'progress-text-fill' | 'progress-neon-bar' | 'progress-scan' | 'progress-split-bar';
/** Animation speed in milliseconds. @default 1000 */
export type AnimationSpeed = number;
/**
 * Source of loading state to observe.
 * - http:   only HTTP request tracking
 * - router: only router navigation tracking
 * - both:   either HTTP or router (default)
 * - none:   no automatic source — purely manual via {@link PlLoadingRegistryService}
 */
export type LoadingSource = 'http' | 'router' | 'both' | 'none';
/**
 * Configuration object passed to {@link PlLoadingTraceModule.forRoot} or
 * {@link providePlLoadingTrace}.
 */
export interface PlLoadingTraceConfig {
    /** Enable HTTP request interception. @default true */
    enableHttpTracer?: boolean;
    /** Enable router navigation tracking. @default true */
    enableRouterTracer?: boolean;
    /**
     * Cardinal position of the indicator (ignored when `animationType === 'bar'`
     * since the bar is always pinned at the top).
     * @default 'center'
     */
    position?: LoadingPosition;
    /** CSS animation to render. @default 'spinner' */
    animationType?: AnimationType;
    /** Speed preset for the animation. @default 'normal' */
    animationSpeed?: AnimationSpeed;
    /**
     * When `true`, a semi-transparent backdrop is rendered behind the indicator.
     * @default true
     */
    modal?: boolean;
    /**
     * URL of a custom GIF/image to display instead of the CSS animation.
     * When provided, `animationType` is ignored.
     */
    customGifUrl?: string;
    /**
     * Milliseconds to wait before showing the loader.
     *
     * The loader is shown **only if** the request/navigation is still active
     * after this delay. A request that completes within this window never
     * triggers the overlay — eliminating flicker for fast responses.
     *
     * Examples:
     * - `0`   — show immediately for every request
     * - `150` — skip the overlay for sub-150 ms responses (default)
     * - `500` — only show for noticeably slow requests
     *
     * Can be configured independently for `http` and `router` sources:
     * ```ts
     * providePlLoadingTrace({
     *   http:   { debounceMs: 500 },  // HTTP: show only after 500 ms
     *   router: { debounceMs: 0 },   // router: show immediately
     * })
     * ```
     * @default 150
     */
    debounceMs?: number;
    /**
     * List of URL substrings that should be excluded from HTTP tracking.
     * @default []
     */
    excludeUrls?: string[];
    /**
     * Opacity of the animation element (spinner, dots, etc.).
     * `1` = fully opaque, `0` = invisible. Background remains transparent.
     * @default 1
     */
    spinnerOpacity?: number;
    /**
     * Optional text label shown below the animation.
     * When empty or omitted, no label is rendered.
     * @default ''
     */
    label?: string;
    /**
     * Color of the label text.
     * When omitted, an auto-contrast default is applied:
     * - `modal: true`  → `'#ffffff'`  (readable on the dark backdrop)
     * - `modal: false` → matches `color` (readable on transparent / page background)
     * @default ''
     */
    labelColor?: string;
    /** CSS `z-index` applied to the overlay. @default 9999 */
    zIndex?: number;
    /**
     * Primary color applied to the spinner, dots, and progress bar.
     * Accepts any valid CSS color string (hex, rgb, hsl…).
     * @default '#3498db'
     */
    color?: string;
    /**
     * Width/height of the spinner circle, or diameter of each dot, in px.
     * @default 40
     */
    size?: number;
    /**
     * Height of the progress bar track in px.
     * Only applies when `animationType === 'bar'`.
     * @default 5
     */
    barHeight?: number;
    /**
     * Gradient start color of the progress bar fill.
     * Falls back to `color` when omitted.
     */
    barColorStart?: string;
    /**
     * Gradient end color of the progress bar fill.
     * @default '#2ecc71'
     */
    barColorEnd?: string;
    /**
     * Background color of the modal backdrop.
     * Accepts any CSS color string (e.g. `'rgba(0,0,0,0.6)'`).
     * @default 'rgba(0, 0, 0, 0.55)'
     */
    backdropColor?: string;
    /**
     * Blur intensity applied to the backdrop in px.
     * @default 2
     */
    backdropBlur?: number;
    /**
     * Background color of the spinner wrapper card.
     * Accepts any valid CSS color string (e.g. `'rgba(255,255,255,0.9)'`, `'#fff'`).
     * @default 'transparent'
     */
    wrapperBg?: string;
    /**
     * Border radius of the spinner wrapper card in px.
     * @default 12
     */
    wrapperRadius?: number;
    /**
     * Padding inside the spinner wrapper card in px.
     * @default 20
     */
    wrapperPadding?: number;
    /**
     * Determinate progress value 0–100 for `progress-ring`, `progress-segments`,
     * and `progress-dots` animation types.
     * Can be overridden at runtime via the `[progress]` input on the component.
     * @default 0
     */
    progressValue?: number;
    /**
     * Number of segments or dots rendered in `progress-segments` / `progress-dots`.
     * Higher values produce a finer ring.
     * Typical presets: **12** (coarse) · **20** (default) · **36** (fine).
     * @default 20
     */
    progressSegments?: number;
}
/**
 * Split configuration passed to {@link providePlLoadingTrace}.
 *
 * Allows independent visual and behavioural settings for HTTP and router
 * overlays while still supporting a common `shared` baseline.
 *
 * Resolution order (later entries win):
 * ```
 * DEFAULT_CONFIG ← shared ← http  (for HTTP overlays)
 * DEFAULT_CONFIG ← shared ← router (for router overlays)
 * DEFAULT_CONFIG ← shared          (for source='both' overlays)
 * ```
 * A per-instance `[config]` binding on `<pl-loading-overlay>` is applied last
 * and always takes highest priority.
 */
export interface PlLoadingTraceOptions {
    /** Defaults shared by both HTTP and router overlays. */
    shared?: Partial<PlLoadingTraceConfig>;
    /** Config applied only to HTTP-sourced overlays. Overrides `shared`. */
    http?: Partial<PlLoadingTraceConfig>;
    /** Config applied only to router-sourced overlays. Overrides `shared`. */
    router?: Partial<PlLoadingTraceConfig>;
}
