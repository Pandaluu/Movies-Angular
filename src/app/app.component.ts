import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'movies';

  public defaultCountry = 'us';

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

    }
  ];

  public toggleCountry(): void {
    this.defaultCountry =
    (this.defaultCountry === 'us') ? this.defaultCountry = 'br'
                                  : this.defaultCountry = 'us';

    this.movies.forEach((movie: any) => {
      movie.shown = (movie.country === this.defaultCountry);
    });
  }
}
