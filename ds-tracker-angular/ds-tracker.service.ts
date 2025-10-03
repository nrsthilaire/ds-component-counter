import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DsTrackerConfig {
  apiUrl: string;
  apiKey: string;
  environment?: string;
  enabled?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DsTrackerService {
  private config?: DsTrackerConfig;

  constructor(private http: HttpClient) {}

  /** Initialize the tracker */
  init(config: DsTrackerConfig): void {
    this.config = config;
  }

  /** Track a component usage event */
  trackComponent(componentName: string): void {
    if (!this.config?.enabled || !this.config?.apiUrl) return;

    const payload = {
      component: componentName,
      route: window.location.pathname,
      hostname: window.location.hostname,
      appVersion: (window as any).APP_VERSION || 'unknown',
      environment: this.config.environment || 'production',
      timestamp: new Date().toISOString()
    };

    this.http
      .post(`${this.config.apiUrl}/ds-usage`, payload, {
        headers: { 'x-api-key': this.config.apiKey }
      })
      .subscribe({
        next: () => {},
        error: (err) => console.debug('[DS Tracker] Error sending usage event', err)
      });
  }
}
