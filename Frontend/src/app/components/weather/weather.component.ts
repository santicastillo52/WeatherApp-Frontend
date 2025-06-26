import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CountriesComponent } from '../countries/countries.component';
import { SelectedCountryComponent } from '../selected-country/selected-country.component';
import { TimeZoneComponent } from '../time-zone/time-zone.component';
import { WeatherCityComponent } from '../weather-city/weather-city.component';
import { TimeComponent } from '../time/time.component';
import { TasksComponent } from '../tasks/tasks.component';
import { Country } from '../../models/country.model';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CountriesComponent,
    SelectedCountryComponent,
    TimeZoneComponent,
    WeatherCityComponent,
    TimeComponent,
    TasksComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit, OnDestroy {
  private readonly weatherService = inject(WeatherService);
  private readonly subscription = new Subscription();
  
  countryData!: Country;
  selectedWeather: any;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.searchCountry('Argentina');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getWeatherByZone(weather: string): void {
    this.searchWeather(weather);
  }

  getCountry(country: string): void {
    this.searchCountry(country);
  }

  searchCountry(country: string): void {
    this.subscription.add(
      this.weatherService.getCountryData(country).subscribe({
        next: (res) => {
          this.countryData = res;
          this.selectedWeather = res.weather;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al obtener datos del país';
        },
      })
    );
  }

  searchWeather(zone: string): void {
    this.subscription.add(
      this.weatherService.getWeather(zone).subscribe({
        next: (res) => {
          this.selectedWeather = res;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al obtener el clima';
        }
      })
    );
  }
}
