import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DsUsageSummary {
  component: string;
  total_usage: number;
  unique_routes: number;
  unique_apps: number;
  last_used: string;
}

@Injectable({ providedIn: 'root' })
export class DsTrackerApiService {
  private apiUrl = 'https://ds-tracker.company.com';
  private apiKey = 'super-secret-key';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<DsUsageSummary[]> {
    return this.http.get<DsUsageSummary[]>(`${this.apiUrl}/ds-usage/summary`, {
      headers: { 'x-api-key': this.apiKey }
    });
  }
}