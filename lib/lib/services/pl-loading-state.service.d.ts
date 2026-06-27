import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PlLoadingTraceConfig, PlLoadingTraceOptions } from '../config/pl-loading-trace.models';
import * as i0 from "@angular/core";
export declare class PlLoadingStateService {
    private httpPendingCount;
    private routerPendingCount;
    private readonly _http$;
    private readonly _router$;
    private readonly _httpSignal;
    private readonly _routerSignal;
    private readonly _sharedConfig;
    private readonly _httpConfig;
    private readonly _routerConfig;
    /** Shared config (source='both' overlays, or backward-compat). */
    readonly config: Signal<Required<PlLoadingTraceConfig>>;
    /** Config resolved for HTTP overlays: DEFAULT ← shared ← http. */
    readonly httpConfig: Signal<Required<PlLoadingTraceConfig>>;
    /** Config resolved for router overlays: DEFAULT ← shared ← router. */
    readonly routerConfig: Signal<Required<PlLoadingTraceConfig>>;
    readonly httpLoading$: Observable<boolean>;
    readonly routerLoading$: Observable<boolean>;
    readonly loading$: Observable<boolean>;
    readonly httpLoadingSignal: Signal<boolean>;
    readonly routerLoadingSignal: Signal<boolean>;
    readonly loadingSignal: Signal<boolean>;
    constructor(options: PlLoadingTraceOptions | null);
    /** Merge a partial config update into all three config signals. */
    updateConfig(partial: Partial<PlLoadingTraceConfig>): void;
    /** Called by the HTTP interceptor to increment / decrement the counter. */
    setHttpLoading(active: boolean): void;
    /** Called by the routing tracker on NavigationStart / NavigationEnd. */
    setRouterLoading(active: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlLoadingStateService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlLoadingStateService>;
}
