import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { Weather } from '../../models/weather.model';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent  {
 private _weather!: Weather;
  private timerSub = new Subscription();
  currentTime!: Date;

  @Input() set weather(value: Weather) {
    if (value?.localtime) {
      this._weather = value;
      this.startClock();
    }
  }

  get weather() {
    return this._weather;
  }

  private startClock() {
    this.timerSub.unsubscribe();
    this.currentTime = new Date(this._weather.localtime.replace(' ', 'T'));

    this.timerSub = interval(1000).subscribe(() => {
      this.currentTime = new Date(this.currentTime.getTime() + 1000);
    });
  }

  ngOnDestroy() {
    this.timerSub.unsubscribe();
  }
}

