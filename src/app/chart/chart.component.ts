import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiServiceService } from '../api-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @ViewChild('weatherChartCanvas') weatherChartCanvas!: ElementRef;
  chart: any;
  weatherdata: any;
  dates: any[] = [];
  temp: any[] = [];
  graph: any;

  //variables for api fetching link
  lattitude: string = '';
  longitude: string = '';
  start: string = '';
  end: string = '';

  constructor(private service: ApiServiceService) { }
  getInfo() {
    this.service.getChartInfo(this.lattitude, this.longitude, this.start, this.end).subscribe(result => {
      console.log(result);
      this.weatherdata = result;
      this.renderChart();
    })
  }
  renderChart() {
    // console.log("chart rendered")
    if (!this.weatherdata || !this.weatherdata.daily) {
      console.error("Weather data is not available yet.");
      return;
    }
    this.dates = this.weatherdata.daily.time;
    this.temp = this.weatherdata.daily.temperature_2m_max;
    if (this.chart) {
      this.chart.destroy();
    }

    this.service.lattitude = this.lattitude;
    this.service.longitude = this.longitude;
    this.service.startDate = this.start;
    this.service.endDate = this.end;

    console.log('lattitude ' + this.service.lattitude);
    console.log('longitude ' + this.service.longitude);
    console.log('start ' + this.service.startDate);
    console.log('end ' + this.service.endDate);
    console.log('Type ' + this.graph)

    // console.log(this.dates);
    // console.log(this.temp);

    this.chart = new Chart(this.weatherChartCanvas.nativeElement, {
      type: this.graph,
      data: {
        labels: this.dates,
        datasets: [{
          label: 'Temperature in Celcius',
          data: this.temp,
          fill: true,
          backgroundColor:'rgba(63, 81, 181, 0.7)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }


  //function to get data from input and pass it to here in variables
  getData(event: any, type: string) {
    const inputValue = event.target.value;

    if (type === 'lattitude') {
      this.lattitude = inputValue;
    } else if (type === 'longitude') {
      this.longitude = inputValue;
    }
    // else if (type === 'graph'){
    //   console.log("graph else if")
    //   this.graph = inputValue;
    // }
  }
  // function to change format of the date
  changeDateFormat(event: MatDatepickerInputEvent<Date | any>, type: string) {
    const formattedDate = this.formatDate(event.value);
    // event.target.value = formattedDate;  
    if (type === 'fromDate') {
      this.start = formattedDate;
    }
    else if (type === 'toDate') {
      this.end = formattedDate
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
  }
  // padding number 5 will become 05 and 12 will be 12
  padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  chartClick() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.getInfo();
  }
}
