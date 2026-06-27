import { OnInit } from '@angular/core';
import { PlLoadingTraceConfig, LoadingSource } from '../../config/pl-loading-trace.models';
import * as i0 from "@angular/core";
/**
 * Visual overlay component. Supports multiple instances on the same page.
 *
 * ```html
 * <!-- Full-screen loader for HTTP requests (default) -->
 * <pl-loading-overlay />
 *
 * <!-- Router navigation bar -->
 * <pl-loading-overlay source="router" />
 *
 * <!-- Contained spinner inside a card (parent needs position:relative) -->
 * <div style="position:relative">
 *   <pl-loading-overlay [contained]="true" />
 *   ...content...
 * </div>
 * ```
 */
export declare class PlLoadingOverlayComponent implements OnInit {
    private readonly loadingState;
    private readonly registry;
    readonly configInput: import("@angular/core").InputSignal<Partial<PlLoadingTraceConfig>>;
    readonly source: import("@angular/core").InputSignal<LoadingSource>;
    readonly contained: import("@angular/core").InputSignal<boolean>;
    /**
     * Runtime-controllable speed override in milliseconds.
     * When set, takes priority over `config.animationSpeed`.
     * Leave unset to use the value from `[config]` or the global default (1000ms).
     */
    readonly speed: import("@angular/core").InputSignal<number | undefined>;
    /**
     * Determinate progress value 0–100 for progress animations.
     * Overrides `config.progressValue` at runtime.
     */
    readonly progress: import("@angular/core").InputSignal<number | undefined>;
    /** Emitted when the loading animation starts (loading becomes true). */
    readonly animationStart: import("@angular/core").OutputEmitterRef<void>;
    /** Emitted when the loading animation ends (loading becomes false). */
    readonly animationEnd: import("@angular/core").OutputEmitterRef<void>;
    /**
     * Optional unique name for this overlay instance.
     * When set, the overlay can be started / stopped programmatically via
     * {@link PlLoadingRegistryService}.start(name) / .stop(name).
     */
    readonly name: import("@angular/core").InputSignal<string>;
    private readonly _httpSig;
    private readonly _routerSig;
    private readonly _bothSig;
    private _registrySig;
    private _registryLabel;
    private _registryProgress;
    private _registryConfig;
    private readonly _instanceId;
    readonly svgGradientId: import("@angular/core").Signal<string>;
    constructor();
    ngOnInit(): void;
    readonly loading: import("@angular/core").Signal<boolean>;
    readonly mergedConfig: import("@angular/core").Signal<Required<PlLoadingTraceConfig>>;
    /** Text rendered below the animation; registry label has priority. */
    readonly displayLabel: import("@angular/core").Signal<string>;
    /** True for the 23 animations that expose a real 0–100 value. */
    readonly isDeterminate: import("@angular/core").Signal<boolean>;
    /** Accessible role for the currently selected indicator. */
    readonly accessibilityRole: import("@angular/core").Signal<"progressbar" | "status">;
    /** Stable accessible name even when no visible label is configured. */
    readonly accessibilityLabel: import("@angular/core").Signal<string>;
    readonly positionClass: import("@angular/core").Signal<string>;
    private readonly resolvedSpeedMs;
    readonly resolvedProgress: import("@angular/core").Signal<number>;
    readonly svgCircumference: number;
    readonly progressRingOffset: import("@angular/core").Signal<number>;
    readonly progressSegmentsData: import("@angular/core").Signal<{
        i: number;
        transform: string;
        active: boolean;
    }[]>;
    readonly progressArcLength: number;
    readonly progressArcOffset: import("@angular/core").Signal<number>;
    readonly progressLinearSteps: import("@angular/core").Signal<{
        i: number;
        active: boolean;
    }[]>;
    readonly isModalBlocking: import("@angular/core").Signal<boolean>;
    readonly wrapperClasses: import("@angular/core").Signal<{
        [x: string]: boolean;
        'pl-loading-wrapper': boolean;
        'pl-loading-wrapper--contained': boolean;
        'pl-loading-wrapper--passthrough': boolean;
    }>;
    readonly backdropStyles: import("@angular/core").Signal<{
        'background-color': string;
        'backdrop-filter': string;
        '-webkit-backdrop-filter': string;
        'z-index': string;
    }>;
    readonly wrapperStyles: import("@angular/core").Signal<{
        background: string;
        'border-radius': string;
        padding: string;
    }>;
    readonly cssVars: import("@angular/core").Signal<{
        '--pl-color': string;
        '--pl-bar-start': string;
        '--pl-bar-end': string;
        '--pl-size': string;
        '--pl-bar-height': string;
        '--pl-anim-dur': string;
        '--pl-bar-dur': string;
        '--pl-backdrop-color': string;
        '--pl-backdrop-blur': string;
        '--pl-opacity': string;
        '--pl-label-color': string;
        '--pl-wrapper-bg': string;
        '--pl-wrapper-radius': string;
        '--pl-wrapper-padding': string;
        '--pl-progress': string;
    }>;
    readonly barWrapperStyles: import("@angular/core").Signal<{
        height: string;
        'z-index': string;
    }>;
    readonly barFillStyles: import("@angular/core").Signal<{
        background: string;
        'box-shadow': string;
        'animation-duration': string;
    }>;
    readonly hostStyles: import("@angular/core").Signal<{
        '--pl-color': string;
        '--pl-bar-start': string;
        '--pl-bar-end': string;
        '--pl-size': string;
        '--pl-bar-height': string;
        '--pl-anim-dur': string;
        '--pl-bar-dur': string;
        '--pl-backdrop-color': string;
        '--pl-backdrop-blur': string;
        '--pl-opacity': string;
        '--pl-label-color': string;
        '--pl-wrapper-bg': string;
        '--pl-wrapper-radius': string;
        '--pl-wrapper-padding': string;
        '--pl-progress': string;
    } | {
        background: string;
        'backdrop-filter': string;
        '-webkit-backdrop-filter': string;
        'pointer-events': string;
        'user-select': string;
        'z-index': string;
        '--pl-color': string;
        '--pl-bar-start': string;
        '--pl-bar-end': string;
        '--pl-size': string;
        '--pl-bar-height': string;
        '--pl-anim-dur': string;
        '--pl-bar-dur': string;
        '--pl-backdrop-color': string;
        '--pl-backdrop-blur': string;
        '--pl-opacity': string;
        '--pl-label-color': string;
        '--pl-wrapper-bg': string;
        '--pl-wrapper-radius': string;
        '--pl-wrapper-padding': string;
        '--pl-progress': string;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlLoadingOverlayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PlLoadingOverlayComponent, "pl-loading-overlay", never, { "configInput": { "alias": "config"; "required": false; "isSignal": true; }; "source": { "alias": "source"; "required": false; "isSignal": true; }; "contained": { "alias": "contained"; "required": false; "isSignal": true; }; "speed": { "alias": "speed"; "required": false; "isSignal": true; }; "progress": { "alias": "progress"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; }, { "animationStart": "animationStart"; "animationEnd": "animationEnd"; }, never, never, true, never>;
}
