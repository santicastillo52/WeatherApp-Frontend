import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Country } from '../../models/country.model';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-time-zone',
  standalone: true,
  imports: [],
  templateUrl: './time-zone.component.html',
  styleUrl: './time-zone.component.scss',
})
export class TimeZoneComponent {
  @Input() country!: Country;
  @Output() sendZone = new EventEmitter<string>();

  selectCity(timezone: string) {
    this.sendZone.emit(timezone);
  }
}
