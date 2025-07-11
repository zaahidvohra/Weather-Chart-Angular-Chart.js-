import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiServiceService } from '../api-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-multi-series',
  templateUrl: './multi-series.component.html',
  styleUrl: './multi-series.component.css'
})
export class MultiSeriesComponent {
  @ViewChild('weatherChartCanvas') weatherChartCanvas!: ElementRef;
  chart: any;
  weatherdata: any;
  geoLocationdata:any;
  dates: any[] = [];
  temp: any[] = [];
  graph:any;

  //variables for api fetching link
  lattitude:string ='';
  longitude:string = '';
  start:string = '';
  end:string = '';
  city:string = '';

  constructor(private service: ApiServiceService) {}
  getInfo() {
    this.getLatLong().subscribe(()=>{
      this.service.getChartInfo(this.lattitude,this.longitude,this.start,this.end).subscribe(result => {
        console.log(result);
        this.weatherdata = result;
        this.renderChart();
    });
    console.log(this.lattitude+' '+' '+this.longitude);
    console.log(this.geoLocationdata);
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
    
    console.log('lattitude '+this.service.lattitude);
    console.log('longitude '+this.service.longitude);
    console.log('start '+this.service.startDate);
    console.log('end '+this.service.endDate);
    console.log('Type '+this.graph);
    console.log(this.city)

    this.chart = new Chart(this.weatherChartCanvas.nativeElement, {
      type: this.graph,
      data: {
        labels: this.dates,
        datasets: [{
          label: 'Temperature in Celcius',
          data: this.temp,
          fill: true,
          backgroundColor:'rgba(63, 81, 181, 0.7)',
          borderWidth: 2,
      //     pointStyle:'rectRot',
      //     pointRadius: 10,
      // pointHoverRadius: 15
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getLatLong(): Observable<any>{
    return this.service.getGeoLocation(this.city).pipe(
      tap((res: any) => {
          this.geoLocationdata = res;
          // this.service.location = this.city
          if (this.city) {
              this.lattitude = this.geoLocationdata.results[0].latitude;
              this.longitude = this.geoLocationdata.results[0].longitude;
          }
      // console.log(this.lattitude + " " + this.longitude)
    })
    )}

  //function to get data from input and pass it to here in variables
  getData(event:any,type:string){
    const inputValue = event.target.value;

    if (type === 'lattitude') {
      this.lattitude = inputValue;
    } else if (type === 'longitude') {
      this.longitude = inputValue;
    }
    // else if (type === 'city'){
    //   this.city = inputValue;
    // }
  }
  // function to change format of the date
  changeDateFormat(event: MatDatepickerInputEvent<Date|any>,type:string) {
    const formattedDate = this.formatDate(event.value);
    // event.target.value = formattedDate;  
    if(type ==='fromDate'){
      this.start = formattedDate;
    }
    else if(type ==='toDate'){
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

  chartClick(){
    if (this.chart) { 
      this.chart.destroy();
    }
    this.getInfo();
  }
}