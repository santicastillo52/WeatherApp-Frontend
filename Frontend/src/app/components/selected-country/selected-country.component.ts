import { Component, Input } from '@angular/core';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-selected-country',
  standalone: true,
  imports: [],
  templateUrl: './selected-country.component.html',
  styleUrl: './selected-country.component.scss'
})
export class SelectedCountryComponent {
  @Input() country!: Country;
}
