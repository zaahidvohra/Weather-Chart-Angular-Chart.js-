import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Multi02Service {
  constructor(private http:HttpClient) { }
  getData(latitude:any,longitude:any){
    const link = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&forecast_days=1`;
    return this.http.get(link);
  }
  getLatLong(city:string){
    const link = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
    // console.log(link)
    return this.http.get(link);
  }
}

