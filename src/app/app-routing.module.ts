import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { LiveChartComponent } from './live-chart/live-chart.component';
import { MultiSeriesComponent } from './multi-series/multi-series.component';
import { HomeComponent } from './home/home.component';
import { MultipleComponent } from './multiple/multiple.component';
import { Multiple02Component } from './multiple02/multiple02.component';
import { DynamicMultipleComponent } from './dynamic-multiple/dynamic-multiple.component';

const routes: Routes = [
  { path: 'history', component: ChartComponent },
  { path: 'live', component: LiveChartComponent },
  { path: 'multi', component: MultiSeriesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'multiple', component: MultipleComponent },
  { path: 'multiple02', component: Multiple02Component },
  { path: 'dynamic', component: DynamicMultipleComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
