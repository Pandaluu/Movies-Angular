import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public title = 'movies';
  public defaultYear = 0;
  public years: number[] = [];
  public yearSubscription: Subscription;

  public movies: Observable<Movie[]>;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.all();
    this.yearSubscription = this.movieService.years$
    .subscribe((_years) => {
      console.log('Years was updated :' + JSON.stringify(_years));
      this.years = _years;
    });
  }

  ngOnDestroy(): void {
    this.yearSubscription.unsubscribe();
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }

  public onClick(id: number) {
    if (this.userService.user) {
      this.router.navigateByUrl('movie/' + id);
    }
  }

}

