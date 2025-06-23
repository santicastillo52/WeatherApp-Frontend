import { Component, Input } from '@angular/core';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-weather-city',
  standalone: true,
  imports: [],
  templateUrl: './weather-city.component.html',
  styleUrl: './weather-city.component.scss',
})
export class WeatherCityComponent {
  @Input() country!: Country;
}
