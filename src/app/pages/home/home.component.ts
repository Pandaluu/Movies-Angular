import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  public movies: Observable<Movie[]>;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.all();
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }

}

