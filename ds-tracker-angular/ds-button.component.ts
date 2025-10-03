import { Component, OnInit } from '@angular/core';
import { DsTrackerService } from './ds-tracker.service';
import { TrackUsage } from './track-usage.decorator';

@TrackUsage('DSButton')
@Component({
  selector: 'ds-button',
  template: '<button class="ds-button"><ng-content></ng-content></button>',
  styles: ['.ds-button { background: var(--color-primary, #007bff); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }']
})
export class DsButtonComponent implements OnInit {
  constructor(public tracker: DsTrackerService) {}

  ngOnInit(): void {
    // Additional logic (if needed)
  }
}
