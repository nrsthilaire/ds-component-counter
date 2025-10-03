# 🧩 DS Tracker Angular Integration

This package provides utilities for automatically tracking Design System component usage.

### Files

- `ds-tracker.service.ts` — Core tracking service
- `track-usage.decorator.ts` — Decorator for automatic tracking
- `ds-button.component.ts` — Example component using the tracker

### Example Setup

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DsTrackerService } from './ds-tracker.service';

@NgModule({
  imports: [HttpClientModule]
})
export class AppModule {
  constructor(private tracker: DsTrackerService) {
    this.tracker.init({
      apiUrl: 'https://ds-tracker.company.com',
      apiKey: 'super-secret-key',
      environment: 'production',
      enabled: true
    });
  }
}
```

### Example Usage

```ts
@TrackUsage('DSButton')
@Component({
  selector: 'ds-button',
  templateUrl: './ds-button.component.html'
})
export class DsButtonComponent {
  constructor(public tracker: DsTrackerService) {}
}
```
