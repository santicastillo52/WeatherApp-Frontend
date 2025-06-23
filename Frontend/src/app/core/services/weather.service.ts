import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../../models/country.model';
import { Observable } from 'rxjs';
import { Weather } from '../../models/weather.model';
import { environment } from '../../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  
  private http = inject(HttpClient);
private apiUrl =  environment.apiUrl;

  getCountryData(country: string): Observable<Country>{
    return this.http.get<Country>(`${this.apiUrl}/country-data/${country}`);
  }
  
  getWeather(city: string): Observable<Weather>{
    return this.http.get<Weather>(`${this.apiUrl}/weather/${city}`)
  }
}
