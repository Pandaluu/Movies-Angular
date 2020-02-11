import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public title = 'movies';
  public defaultCountry = 'all';
  public countries: Set<string> = new Set();

  public movies: any[] = [
    {
      title: 'Joker',
      year: 2019,
      country: 'United States',
      shown: true
    },
    {
      title: 'Avengers',
      year: 2012,
      country: 'USA',
      shown: true
    },
    {
      title: 'Interstellar',
      year: 2014,
      country: 'Angleterre',
      shown: true
    },
    {
      title: 'Parasite',
      year: 2019,
      country: 'Corée',
      shown: true
    }
  ];

  constructor() {
    this.movies.forEach(movie => {
      this.countries.add(movie.country);
    });
  }

  ngOnInit(): void {}
}
