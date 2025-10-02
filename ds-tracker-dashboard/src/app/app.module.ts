import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DsDashboardComponent } from './components/ds-dashboard/ds-dashboard.component';

@NgModule({
  declarations: [AppComponent, DsDashboardComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}