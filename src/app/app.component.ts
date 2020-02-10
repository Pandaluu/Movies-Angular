import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'movies';

  public defaultCountry = 'all';

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'us',
      shown: true
    },
    {
      title: 'Avengers',
      year: 2012,
      country: 'us',
      shown: true
    },
    {
      title: 'Interstellar',
      year: 2014,
      country: 'br',
      shown: true
    },
    {
      title: 'Parasite',
      year: 2019,
      country: 'kr',
      shown: true
    }
  ];

  public countries: Set<string> = new Set();

  public constructor() {
    this.movies.forEach(movie => {
      this.countries.add(movie.country);
    });
  }
}
