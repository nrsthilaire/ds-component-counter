import { Component, OnInit } from '@angular/core';
import { DsTrackerApiService, DsUsageSummary } from '../../services/ds-tracker-api.service';

@Component({
  selector: 'ds-dashboard',
  templateUrl: './ds-dashboard.component.html',
  styleUrls: []
})
export class DsDashboardComponent implements OnInit {
  usageData: DsUsageSummary[] = [];
  loading = true;

  constructor(private api: DsTrackerApiService) {}

  ngOnInit(): void {
    this.api.getSummary().subscribe({
      next: (data) => { this.usageData = data; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }
}