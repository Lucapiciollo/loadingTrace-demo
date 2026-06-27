import { Signal } from '@angular/core';
import { PlLoadingTraceConfig } from '../config/pl-loading-trace.models';
import * as i0 from "@angular/core";
/**
 * Registry that lets you imperatively start / stop named overlay instances.
 *
 * ## Usage
 * ```html
 * <!-- template -->
 * <pl-loading-overlay name="save-btn" [contained]="true" source="none" />
 * ```
 * ```typescript
 * // component / service
 * private readonly registry = inject(PlLoadingRegistryService);
 *
 * save() {
 *   this.registry.start('save-btn');
 *   this.api.save().subscribe({
 *     complete: () => this.registry.stop('save-btn'),
 *     error:    () => this.registry.stop('save-btn'),
 *   });
 * }
 * ```
 *
 * A named overlay responds to **both** its `source` stream (http / router / both)
 * **and** manual registry calls — loading is shown when either is active.
 * If you want a purely manual overlay, set `source="none"`.
 */
export declare class PlLoadingRegistryService {
    private readonly _slots;
    /**
     * Returns a read-only signal for the config override of `name`.
     * Called by the overlay component on initialisation.
     */
    registerConfigOverride(name: string): Signal<Partial<PlLoadingTraceConfig> | null>;
    /**
     * Replace the per-overlay config override for `name`.
     * All specified keys win over the global config AND the `[config]` input binding,
     * enabling full runtime reconfiguration (color, animationType, size, …).
     *
     * `label` is handled separately: when present it updates the dynamic label signal
     * (highest priority in the overlay) and is NOT stored in the config override.
     */
    setConfig(name: string, config: Partial<PlLoadingTraceConfig>): void;
    /**
     * Shallow-merge `config` into the existing per-overlay config override.
     * Only the specified keys are updated; the rest stay as-is.
     *
     * Passing `{ label: '…' }` alone is valid and only updates the label —
     * no other visual properties are changed.
     */
    patchConfig(name: string, config: Partial<PlLoadingTraceConfig>): void;
    /**
     * Returns a snapshot of the current per-overlay config override for `name`,
     * including the active dynamic label (if any) as the `label` key.
     *
     * Useful to save the state before a temporary change so it can be restored:
     * ```ts
     * const saved = registry.getConfig('my-overlay');
     * registry.patchConfig('my-overlay', { label: 'Saving…', color: 'orange' });
     * // … later:
     * registry.setConfig('my-overlay', saved);
     * ```
     */
    getConfig(name: string): Partial<PlLoadingTraceConfig>;
    /** Remove all per-overlay config overrides and clear the dynamic label for `name`. */
    resetConfig(name: string): void;
    /**
     * Returns a read-only signal for `name`, creating the slot if needed.
     * Called by the overlay component on initialisation.
     */
    register(name: string): Signal<boolean>;
    /**
     * Returns a read-only signal for the label of `name`.
     * The label is set via {@link start} and cleared on {@link stop}.
     */
    registerLabel(name: string): Signal<string>;
    /**
     * Returns a read-only signal for the progress of `name` (0–100, or null).
     * Called by the overlay component on initialisation.
     */
    registerProgress(name: string): Signal<number | null>;
    /**
     * Set the determinate progress value for the named overlay.
     * @param name  Overlay name (must match the `[name]` binding on the component).
     * @param value Progress 0–100.
     */
    setProgress(name: string, value: number): void;
    /**
     * Reset the progress to null (reverts to `config.progressValue` / `[progress]` input).
     */
    resetProgress(name: string): void;
    /**
     * Start loading for the named overlay.
     * @param name  Overlay name.
     * @param label Optional text to display inside the overlay while active.
     */
    start(name: string, label?: string): void;
    /** Stop loading and clear the dynamic label for the named overlay. */
    stop(name: string): void;
    /**
     * Convenience: start loading AND set progress to 0 in one call.
     * Equivalent to `start(name) + setProgress(name, 0)`.
     */
    startProgress(name: string, label?: string): void;
    /**
     * Convenience: set progress to 100 and then stop loading.
     * Useful to complete a progress animation and hide the overlay.
     * @param stopDelayMs  Extra ms to keep the overlay visible at 100% before hiding.
     */
    completeProgress(name: string, stopDelayMs?: number): void;
    /** Toggle loading state for the named overlay. */
    toggle(name: string, label?: string): void;
    /** Returns `true` if the named overlay is currently in manual loading state. */
    isActive(name: string): boolean;
    private _getOrCreate;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlLoadingRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlLoadingRegistryService>;
}
