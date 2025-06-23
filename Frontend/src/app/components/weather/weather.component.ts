import { Component, inject } from '@angular/core';
import { CountriesComponent } from '../countries/countries.component';
import { Country } from '../../models/country.model';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../core/services/weather.service';
import { SelectedCountryComponent } from '../selected-country/selected-country.component';
import { TimeZoneComponent } from '../time-zone/time-zone.component';
import { WeatherCityComponent } from '../weather-city/weather-city.component';
import { TimeComponent } from '../time/time.component';
import { TasksComponent } from '../tasks/tasks.component';

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
export class WeatherComponent {
  private weatherService = inject(WeatherService);
  subscription = new Subscription();
  countryData!: Country;
  selectedWeather: any;
  errorMessage: string | null = null;

  ngOnInit() {
    this.searchCountry('Argentina');
  }

  getWeatherByZone(weather: string) {
    this.searchWeather(weather);
  }

  getCountry(country: string) {
    this.searchCountry(country);
  }
  /* desde este componente debemos pasar al resto de componentes la data asi solo realizamos una llamada al back*/
  searchCountry(country: string) {
    this.subscription.add(
      this.weatherService.getCountryData(country).subscribe({
        next: (res) => {
          this.countryData = res;
          this.selectedWeather = res.weather;
          console.log(this.countryData);
        },
        error: (error) => {
          console.error('Error', error);
          this.errorMessage = error.error?.message;
        },
      })
    );
  }

  searchWeather(zone: string) {
    this.subscription.add(
      this.weatherService.getWeather(zone).subscribe({
        next: (res) => {
          this.selectedWeather = res;
          console.log(this.selectedWeather);
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.error?.message;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
