import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { end } from '@popperjs/core';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }
  
  getData(latitude:any,longitude:any,startdate:any,enddate:any){
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`;
    const link2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&past_days=${startdate}&forecast_days=${enddate}`;
    return this.http.get(link2);
  }
  getLatLong(city:string){
    const link = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
    // console.log(link)
    return this.http.get(link);
  }
}