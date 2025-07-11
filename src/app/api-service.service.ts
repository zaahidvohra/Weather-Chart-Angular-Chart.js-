import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }
  
  lattitude:string = '52.52';
  longitude:string = '13.41';
  startDate:string = '2024-02-07';
  endDate:string = '2024-02-21';

  // location:string = 'mumbai';
  // link:string = `https://archive-api.open-meteo.com/v1/era5?latitude=${this.lattitude}&longitude=${this.longitude}&start_date=${this.startDate}&end_date=${this.endDate}&daily=temperature_2m_max`
  
  getChartInfo(latitude: string, longitude: string, startDate: string, endDate: string): Observable<any> {
    const link = `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max`;
    return this.http.get(link);
  }
  getGeoLocation(location:string){
    const link = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`; 
    return this.http.get(link);
  }
}
