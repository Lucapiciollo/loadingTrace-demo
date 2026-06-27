import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlLoadingStateService } from './pl-loading-state.service';
import * as i0 from "@angular/core";
/**
 * Listens to Angular Router events and forwards the loading state to
 * {@link PlLoadingStateService}.
 *
 * The service self-initialises in its constructor; it must be eagerly
 * instantiated by the module or an `APP_INITIALIZER` factory.
 */
export declare class PlRoutingTrackerService implements OnDestroy {
    private readonly router;
    private readonly loadingState;
    private sub?;
    constructor(router: Router, loadingState: PlLoadingStateService);
    private startTracking;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlRoutingTrackerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlRoutingTrackerService>;
}
