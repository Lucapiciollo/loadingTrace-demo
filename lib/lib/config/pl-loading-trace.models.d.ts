/**
 * Cardinal positions where the loading overlay can appear.
 * - center:     centered on screen (default)
 * - top:        top-center
 * - bottom:     bottom-center
 * - top-left:   top-left corner
 * - top-right:  top-right corner
 */
export type LoadingPosition = 'center' | 'top' | 'bottom' | 'top-left' | 'top-right';
/** Built-in CSS animation types. */
export type AnimationType = 'spinner' | 'dots' | 'bar' | 'ring-fade' | 'pulse' | 'ripple' | 'orbit' | 'wave' | 'bounce-bar' | 'flip' | 'square-spin' | 'chase' | 'dna' | 'ellipsis' | 'hourglass' | 'infinity' | 'meteor' | 'morph' | 'neon-ring' | 'skeleton' | 'typing' | 'windmill' | 'cube-grid' | 'fading-circle' | 'double-ring' | 'radar' | 'jelly' | 'rotate-plane' | 'wandering-cubes' | 'grid-fade' | 'three-bounce' | 'arc' | 'google-line' | 'route-progress' | 'matrix-rain' | 'terminal-cursor' | 'cyber-scan' | 'liquid-orb' | 'elastic-dots' | 'gradient-ring' | 'data-stream' | 'network-nodes' | 'loading-stripes' | 'glitch' | 'halo-pulse' | 'ios-dots' | 'android-bar' | 'neon-bars' | 'rotating-dashes' | 'ping-dot' | 'progress-pill' | 'copilot-border' | 'angular-orbit' | 'roaming-shadow' | 'galaxy-swirl' | 'nebula-cloud' | 'portal-tunnel' | 'aurora-ribbon' | 'quantum-orbit' | 'particle-vortex' | 'prism-burst' | 'magnetic-field' | 'solar-flare' | 'crystal-spin' | 'eclipse-ring' | 'comet-trail' | 'helix-stream' | 'plasma-core' | 'gravity-well' | 'photon-lattice' | 'ion-storm' | 'orbit-collapse' | 'pulse-grid' | 'atom-core' | 'starfield-warp' | 'laser-cage' | 'flux-wave' | 'hologram-scan' | 'wormhole-ring' | 'nano-swarm' | 'energy-cube' | 'chrono-dial' | 'singularity-pulse' | 'light-cone' | 'aurora-orbit' | 'progress-ring' | 'progress-segments' | 'progress-dots' | 'progress-bar' | 'progress-striped' | 'progress-thin' | 'progress-steps' | 'progress-blocks' | 'progress-battery' | 'progress-dial' | 'progress-level' | 'progress-arc' | 'progress-counter' | 'progress-wave-bar' | 'progress-pixel' | 'progress-clock' | 'progress-tower' | 'progress-dots-row' | 'progress-gradient-ring' | 'progress-text-fill' | 'progress-neon-bar' | 'progress-scan' | 'progress-split-bar';
/** Animation speed in milliseconds. @default 1000 */
export type AnimationSpeed = number;
/** Loading source observed by an overlay instance. */
export type LoadingSource = 'http' | 'router' | 'both' | 'none';
/** Visual and behavioural configuration for LoadingTrace. */
export interface PlLoadingTraceConfig {
    enableHttpTracer?: boolean;
    enableRouterTracer?: boolean;
    position?: LoadingPosition;
    animationType?: AnimationType;
    animationSpeed?: AnimationSpeed;
    modal?: boolean;
    customGifUrl?: string;
    debounceMs?: number;
    excludeUrls?: string[];
    spinnerOpacity?: number;
    label?: string;
    labelColor?: string;
    zIndex?: number;
    color?: string;
    size?: number;
    barHeight?: number;
    barColorStart?: string;
    barColorEnd?: string;
    backdropColor?: string;
    backdropBlur?: number;
    wrapperBg?: string;
    wrapperRadius?: number;
    wrapperPadding?: number;
    progressValue?: number;
    progressSegments?: number;
}
/** Split configuration accepted by providePlLoadingTrace / forRoot. */
export interface PlLoadingTraceOptions {
    shared?: Partial<PlLoadingTraceConfig>;
    http?: Partial<PlLoadingTraceConfig>;
    router?: Partial<PlLoadingTraceConfig>;
}
