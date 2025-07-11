import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiServiceService } from './api-service.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-live-chart',
  templateUrl: './live-chart.component.html',
  styleUrl: './live-chart.component.css'
})
export class LiveChartComponent {
  chart: any;
  weatherdata: any;
  temperature: any[] = [];
  time: any[] = [];

  city: any = ''
  latlongData: any
  latitude: any
  longitude: any
  graph:any
  constructor(private apiService: ApiServiceService) {
    this.timeArray();
  }

  chartClick() {
    this.getLatLong().subscribe(() => {
      this.apiService.getData(this.latitude, this.longitude).subscribe((res) => {
        this.weatherdata = res;
        console.log(this.weatherdata);
        this.generateChart();
        // console.log(this.time)
      })
    })
  }

  generateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.temperature = this.weatherdata.hourly.temperature_2m;
    this.chart = new Chart('live-chart', {
      type: this.graph,
      data: {
        labels: this.time,
        datasets: [{
          label: "Today's Forecast",
          data: this.temperature,
          borderWidth: 2,
          backgroundColor:'rgba(63, 81, 181, 0.7)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    })
  }


  timeArray() {
    for (let i = 0; i < 24; i++) {
      let hrs = i < 10 ? "0" + i : i;
      this.time.push(hrs + ":00");
    }
  }

  getLatLong(): Observable<any> {
    return this.apiService.getLatLong(this.city).pipe(
      tap((res: any) => {
        this.latlongData = res;
        if (this.city) {
          this.latitude = this.latlongData.results[0].latitude;
          this.longitude = this.latlongData.results[0].longitude;
        }
      })
    )
  }
}
