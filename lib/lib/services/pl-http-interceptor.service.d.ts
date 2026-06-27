import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlLoadingStateService } from './pl-loading-state.service';
import * as i0 from "@angular/core";
/**
 * Class-based interceptor.
 *
 * Provide via the `HTTP_INTERCEPTORS` multi-token:
 * ```ts
 * { provide: HTTP_INTERCEPTORS, useClass: PlLoadingHttpInterceptor, multi: true }
 * ```
 * Requires `provideHttpClient(withInterceptorsFromDi())` in the host app.
 */
export declare class PlLoadingHttpInterceptor implements HttpInterceptor {
    private readonly loadingState;
    constructor(loadingState: PlLoadingStateService);
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlLoadingHttpInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlLoadingHttpInterceptor>;
}
/**
 * Functional interceptor — for modern standalone Angular apps.
 *
 * Register in the host app:
 * ```ts
 * provideHttpClient(withInterceptors([plLoadingHttpInterceptor]))
 * ```
 */
export declare const plLoadingHttpInterceptor: HttpInterceptorFn;
