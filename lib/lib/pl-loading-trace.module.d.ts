import { ModuleWithProviders } from '@angular/core';
import { PlLoadingTraceOptions } from './config/pl-loading-trace.models';
import { PlRoutingTrackerService } from './services/pl-routing-tracker.service';
import * as i0 from "@angular/core";
import * as i1 from "./components/pl-loading-overlay/pl-loading-overlay.component";
/**
 * NgModule wrapper for module-based Angular applications.
 *
 * ## Usage
 * ```ts
 * // app.module.ts
 * @NgModule({
 *   imports: [
 *     PlLoadingTraceModule.forRoot({
 *       shared: { enableHttpTracer: true, enableRouterTracer: true, debounceMs: 150 },
 *       http:   { animationType: 'spinner', modal: true },
 *       router: { animationType: 'bar' },
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * Then add the overlay to your root template:
 * ```html
 * <pl-loading-overlay />
 * ```
 *
 * > **HTTP interceptor note**: for Angular 17+ apps that use
 * > `provideHttpClient()`, add `withInterceptorsFromDi()` so that
 * > class-based interceptors are picked up:
 * > ```ts
 * > provideHttpClient(withInterceptorsFromDi())
 * > ```
 * > Alternatively import the functional interceptor directly:
 * > ```ts
 * > provideHttpClient(withInterceptors([plLoadingHttpInterceptor]))
 * > ```
 */
export declare class PlLoadingTraceModule {
    private readonly _tracker;
    /**
     * Force eager instantiation of {@link PlRoutingTrackerService} so that
     * router events are captured from application start.
     */
    constructor(_tracker: PlRoutingTrackerService);
    static forRoot(options?: PlLoadingTraceOptions): ModuleWithProviders<PlLoadingTraceModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlLoadingTraceModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PlLoadingTraceModule, never, [typeof i1.PlLoadingOverlayComponent], [typeof i1.PlLoadingOverlayComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PlLoadingTraceModule>;
}
