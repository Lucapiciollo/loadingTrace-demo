import { EnvironmentProviders } from '@angular/core';
import { PlLoadingTraceOptions } from './config/pl-loading-trace.models';
/**
 * Standalone / functional provider for Angular 17+ applications.
 *
 * ## Usage — `app.config.ts`
 * ```ts
 * providePlLoadingTrace({
 *   shared: { enableHttpTracer: true, enableRouterTracer: true, debounceMs: 200 },
 *   http:   { animationType: 'spinner', position: 'center', modal: false },
 *   router: { animationType: 'bar', barColorStart: '#6c63ff', barColorEnd: '#ff6584' },
 * })
 * ```
 *
 * All keys are optional — omit `http` or `router` to inherit from `shared`.
 */
export declare function providePlLoadingTrace(options?: PlLoadingTraceOptions): EnvironmentProviders;
