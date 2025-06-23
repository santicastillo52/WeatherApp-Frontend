import { timezones } from "./timezones.model";
import { Weather } from "./weather.model";

export interface Country {
  country_name: string;
  country_capital: string;
  weather: Weather;
  timezones: timezones[];
}

