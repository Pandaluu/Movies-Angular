import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';

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
      shown: true,
      src: './assets/img/joker-poster.jpg'
    },
    {
      title: 'Avengers',
      year: 2012,
      country: 'United States',
      shown: true,
      src: './assets/img/avengers-poster.jpg'
    },
    {
      title: 'Interstellar',
      year: 2014,
      country: 'Angleterre',
      shown: true,
      src: './assets/img/interstellar.jpg'
    },
    {
      title: 'Parasite',
      year: 2019,
      country: 'Corée',
      shown: true,
      src: '.assets/img/parasite_poster.jpeg'
    }
  ];

  constructor(private movieService: MovieService) {
    this.movies.forEach(movie => {
      this.countries.add(movie.country);
    });

    this.movieService.all()
    .pipe(
      take(1)
    )

    .subscribe((response: any[]) => {
      console.log(`Response : ${JSON.stringify(response)}`);
      this.movies = response.map((movie: Movie) => {
        return new Movie().deserialize(movie);
      });
    });
  }

  ngOnInit(): void {}
}
