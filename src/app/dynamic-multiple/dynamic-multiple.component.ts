import { CSP_NONCE, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiServiceService } from './api-service.service';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-dynamic-multiple',
  templateUrl: './dynamic-multiple.component.html',
  styleUrl: './dynamic-multiple.component.css'
})
export class DynamicMultipleComponent {
  toppings = new FormControl('');
  capitals = [
    "Amaravati",
    "Itanagar",
    "Dispur",
    "Patna",
    "Raipur",
    "Panaji",
    "Gandhinagar",
    "Chandigarh",
    "Shimla",
    "Srinagar",
    "Ranchi",
    "Bengaluru",
    "Thiruvananthapuram",
    "Bhopal",
    "Mumbai",
    "Imphal",
    "Shillong",
    "Aizawl",
    "Kohima",
    "Bhubaneswar",
    "Chandigarh",
    "Jaipur",
    "Gangtok",
    "Chennai",
    "Hyderabad",
    "Agartala",
    "Dehradun",
    "Lucknow",
    "Kolkata",
    "Port Blair",
    "Chandigarh",
    "Silvassa",
    "Daman",
    "New Delhi",
    "Kavaratti",
    "Puducherry"
  ]
  minDate0:any
  maxDate0:any
  minDate1:any
  maxDate1:any

  startdate:any = 0
  enddate:any = 0

  progress:any = 0
  chart: any
  weatherData: any
  geolocationData: any
  latitudeData: any[] = []
  longitudeData: any[] = []
  temperatureData: any[] = []
  time: any[] = []
  dataSets:any[]=[]
  selectedStates: any
  graph:any
  wait:boolean = false
  constructor(private service: ApiServiceService) {
    const currentDate = new Date();
    this.minDate0 = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
    this.maxDate0 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.minDate1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.maxDate1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+16);
    // this.timeArray();
  }

  async getChartData() {
    this.progress = 60
    if(this.temperatureData){
      this.temperatureData=[];
    }
    for (let i = 0; i < this.selectedStates.length; i++) {
      const res = await this.service.getData(this.latitudeData[i], this.longitudeData[i],this.startdate,this.enddate).toPromise();
      this.weatherData = res;
      // console.log(this.weatherData)
      const temp = {
        capital: this.selectedStates[i],
        temperature: this.weatherData.daily.temperature_2m_max,
        dates: this.weatherData.daily.time
      };
      this.temperatureData.push(temp);
      this.time = temp.dates
    }
    // console.log('Temp data array')
    // console.log(this.temperatureData);
    this.progress = 80
    this.createChart();
  }

  async getData() {
    this.progress = 20
    if(this.selectedStates && this.latitudeData && this.longitudeData){
      this.selectedStates = []
      this.latitudeData = []
      this.longitudeData = []
    }
    this.selectedStates = this.toppings.value
    // console.log(this.selectedStates)
    // console.log(this.selectedStates.length)
    for (let i = 0; i < this.selectedStates.length; i++) {
      const res = await this.service.getLatLong(this.selectedStates[i]).toPromise();
      this.geolocationData = res;
      // console.log(this.selectedStates[i]);
      // console.log(this.geolocationData);
      this.latitudeData.push(this.geolocationData.results[0].latitude);
      this.longitudeData.push(this.geolocationData.results[0].longitude);
      // console.log(this.latitudeData);
      // console.log(this.longitudeData);
    }
    this.progress = 50
    this.getChartData();
    // console.log("for loop ended")
  }

  createChart() {
    this.progress=100
    if (this.chart && this.dataSets) {
      this.chart.destroy();
      this.dataSets = []
    }
    for(let i=0; i<this.selectedStates.length;i++){
      const temp = {
        type: this.graph,
        label: this.selectedStates[i],
        data: this.temperatureData[i].temperature,
        borderWidth:3,
        pointStyle:false,
        tension: 0.2
      };
      this.dataSets.push(temp);
    }
    console.log(this.dataSets)
    this.chart = new Chart('live-chart', {
      data: {
        datasets: this.dataSets,
        labels: this.time,
        
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
    setTimeout(()=> {
      this.progress = 0
    },2000)
  }

  timeArray() {
    for (let i = 0; i < 24; i++) {
      let hrs = i < 10 ? "0" + i : i;
      this.time.push(hrs + ":00");
    }
  }
  changeDateFormat(event: MatDatepickerInputEvent<Date|any>,type:string){
    const formattedDate = this.formatDate(event.value);
    // event.target.value = formattedDate;  
    if(type ==='fromDate'){
      this.startdate = formattedDate;
      console.log(this.startdate)
    }
    else if(type ==='toDate'){
      this.enddate = formattedDate
      console.log(this.enddate)
    }
  }

  formatDate(date: Date): number {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffDays = Math.abs(Math.ceil((date.getTime() - today.getTime()) / oneDay));
    // console.log(today)
    // console.log(oneDay)
    // console.log(diffDays)
    return diffDays;
  }

}
