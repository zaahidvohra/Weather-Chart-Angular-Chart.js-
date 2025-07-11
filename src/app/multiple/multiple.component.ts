import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MultiApiService } from './multi-api.service';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrl: './multiple.component.css'
})
export class MultipleComponent {
  chart: any;
  weatherdata: any;
  weatherdata1: any;
  weatherdata2: any;

  temperature: any[] = [];
  temperature1: any[] = [];
  temperature2: any[] = [];

  time: any[] = [];

  city: any = ''
  city1: any = ''
  city2: any = ''

  latlongData: any
  latlongData1: any
  latlongData2: any

  latitude: any
  latitude1: any
  latitude2: any

  longitude: any
  longitude1: any
  longitude2: any

  constructor(private apiService: MultiApiService) {
    this.timeArray();
  }
  chartClick() {
    this.getLatLong().subscribe(() => {
      this.getLatLong1().subscribe(() => {
        this.getLatLong2().subscribe(() => {
          this.apiService.getData(this.latitude, this.longitude).subscribe((res) => {
            this.weatherdata = res;
            console.log(this.weatherdata);

            this.apiService.getData(this.latitude1, this.longitude1).subscribe((res) => {
              this.weatherdata1 = res;
              console.log(this.weatherdata1);

              this.apiService.getData(this.latitude2, this.longitude2).subscribe((res) => {
                this.weatherdata2 = res;
                console.log(this.weatherdata2);

                this.saveData();
                this.generateChart();
              })
            })
          })
        })
      })
    })
  }
  saveData(){
    this.temperature = this.weatherdata.hourly.temperature_2m;
    this.temperature1 = this.weatherdata1.hourly.temperature_2m;
    this.temperature2 = this.weatherdata2.hourly.temperature_2m;
  }
  
  generateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    // this.saveData();

    this.chart = new Chart('live-chart', {
      data: {
        datasets: [{
          type: 'line',
          label: this.city,
          data: this.temperature
        }, {
          type: 'line',
          label: this.city1,
          data: this.temperature1,
        },
        {
          type: 'line',
          label: this.city2,
          data: this.temperature2,
        }],
        labels: this.time
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
  getLatLong1(): Observable<any> {
    return this.apiService.getLatLong(this.city1).pipe(
      tap((res: any) => {
        this.latlongData1 = res;
        if (this.city) {
          this.latitude1 = this.latlongData1.results[0].latitude;
          this.longitude1 = this.latlongData1.results[0].longitude;
        }
      })
    )
  }
  getLatLong2(): Observable<any> {
    return this.apiService.getLatLong(this.city2).pipe(
      tap((res: any) => {
        this.latlongData2 = res;
        if (this.city) {
          this.latitude2 = this.latlongData2.results[0].latitude;
          this.longitude2 = this.latlongData2.results[0].longitude;
        }
      })
    )
  }
}
