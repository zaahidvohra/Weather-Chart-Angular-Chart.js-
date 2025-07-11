import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Multi02Service } from './multi02.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-multiple02',
  templateUrl: './multiple02.component.html',
  styleUrl: './multiple02.component.css'
})
export class Multiple02Component {
  chart: any
  weatherdata0: any; weatherdata1: any; weatherdata2: any; weatherdata3: any; weatherdata4: any
  temperature0: any[] = []
  temperature1: any[] = []
  temperature2: any[] = []
  temperature3: any[] = []
  temperature4: any[] = []
  time: any[] = []
  city0: any; city1: any; city2: any; city3:any; city4:any
  latlongData: any
  latitude0: any; latitude1: any; latitude2: any; latitude3:any; latitude4:any
  longitude0: any; longitude1: any; longitude2: any; longitude3:any; longitude4:any

  constructor(private apiService: Multi02Service) {
    this.timeArray();
  }
  timeArray() {
    for (let i = 0; i < 24; i++) {
      let hrs = i < 10 ? "0" + i : i;
      this.time.push(hrs + ":00");
    }
  }

  getLatLong() {
    for (let i = 0; i < 5; i++) {
      let cityName: keyof Multiple02Component = 'city' + i as keyof Multiple02Component;
      let latitude: keyof Multiple02Component = 'latitude' + i as keyof Multiple02Component;
      let longitude: keyof Multiple02Component = 'longitude' + i as keyof Multiple02Component;
      // console.log(cityName)
      this.apiService.getLatLong(this[cityName]).subscribe((res) => {
        this.latlongData = res;
        // console.log(this.latlongData)
        if (cityName) {
          this[latitude] = this.latlongData.results[0].latitude;
          this[longitude] = this.latlongData.results[0].longitude;
        }
        // console.log(this[latitude], this[longitude])
        this.getChartData()
      })
    }
  }
  getChartData() {
    for (let i = 0; i < 5; i++) {
      let weatherdata: keyof Multiple02Component = 'weatherdata' + i as keyof Multiple02Component;
      let latitude: keyof Multiple02Component = 'latitude' + i as keyof Multiple02Component;
      let longitude: keyof Multiple02Component = 'longitude' + i as keyof Multiple02Component;
      let temp: keyof Multiple02Component = 'temperature' + i as keyof Multiple02Component;

      this.apiService.getData(this[latitude], this[longitude]).subscribe((res) => {
        this[weatherdata] = res;
        this[temp] = this[weatherdata].hourly.temperature_2m;
        // console.log(this[weatherdata])
        // console.log(this[temp])
      })
    }
    setTimeout(() => {
      this.createChart();
    }, 1500);
  }
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    // this.saveData();

    this.chart = new Chart('live-chart', {
      data: {
        datasets: [{
          type: 'line',
          label: this.city0,
          data: this.temperature0,
          borderWidth: 3
        }, {
          type: 'line',
          label: this.city1,
          data: this.temperature1,
          borderWidth: 3
        },
        {
          type: 'line',
          label: this.city2,
          data: this.temperature2,
          borderWidth: 3
        },
        {
          type: 'line',
          label: this.city3,
          data: this.temperature3,
          borderWidth: 3
        },
        {
          type: 'line',
          label: this.city4,
          data: this.temperature4,
          borderWidth: 3
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

}
