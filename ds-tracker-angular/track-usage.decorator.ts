import { DsTrackerService } from './ds-tracker.service';

/**
 * Decorator to automatically track component usage
 * Example: @TrackUsage('DSButton')
 */
export function TrackUsage(componentName: string) {
  return function (constructor: any) {
    const original = constructor.prototype.ngOnInit;
    constructor.prototype.ngOnInit = function (...args: any[]) {
      const tracker: DsTrackerService = (this as any).tracker;
      if (tracker) tracker.trackComponent(componentName);
      if (original) original.apply(this, args);
    };
  };
}
