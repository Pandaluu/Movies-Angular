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
  public defaultYear = 0;
  public years: number[] = [];


  public movies: any[] = [];

  constructor(private movieService: MovieService) {


  }

  ngOnInit(): void {
    const years: Set<number> = new Set<number>();

    this.movieService.all()
    .pipe(
      take(1)
    )

    .subscribe((response: any[]) => {
      console.log(`Response : ${JSON.stringify(response)}`);
      this.movies = response.map((movie: Movie) => {
        years.add(movie.year);
        return new Movie().deserialize(movie);
      });
      this.years = Array.from(years).sort();
    });
  }
}
