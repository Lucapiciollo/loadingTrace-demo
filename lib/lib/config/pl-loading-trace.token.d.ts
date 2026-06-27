import { InjectionToken } from '@angular/core';
import { PlLoadingTraceConfig, PlLoadingTraceOptions } from './pl-loading-trace.models';
/** Injection token used to pass the library configuration through the DI tree. */
export declare const PL_LOADING_TRACE_CONFIG: InjectionToken<PlLoadingTraceOptions>;
/** Default values applied when a config key is omitted. */
export declare const PL_LOADING_TRACE_DEFAULT_CONFIG: Required<PlLoadingTraceConfig>;
