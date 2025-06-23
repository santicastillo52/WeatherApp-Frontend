import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../../models/country.model';
import { Observable } from 'rxjs';
import { Weather } from '../../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getCountryData(country: string): Observable<Country>{
    return this.http.get<Country>(`${this.apiUrl}/country-data/${country}`);
  }
  
  getWeather(city: string): Observable<Weather>{
    return this.http.get<Weather>(`${this.apiUrl}/weather/${city}`)
  }
}
