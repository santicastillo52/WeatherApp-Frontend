import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
@Output() sendCountry = new EventEmitter<string>();

  searchCountry(country: string){
    this.sendCountry.emit(country);
  }

}
