import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketSubject } from 'rxjs/webSocket';

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

  private socket$: WebSocketSubject<any>;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.socket$ = new WebSocketSubject<any>('ws://127.0.0.1:9090');

    this.movies = this.movieService.all();

    this.yearSubscription = this.movieService.years$
    .subscribe((_years) => {
      console.log('Years was updated :' + JSON.stringify(_years));
      this.years = _years;
    });
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }

  public moveTo(idMovie: number): void {
    if( this.userService.user && this.userService.user !== null) {
      this.router.navigate(['../','movie', idMovie]);
    } else {
      // Load a toast and route to login
      const snack: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
        'You have to login or create an account before',
        null,
        {
          duration: 2500,
          verticalPosition: 'top'
        }
      );
      snack.afterDismissed().subscribe((status: any) => {
        const navigationExtras: NavigationExtras = {state: {movie: idMovie}};
        this.router.navigate(['../', 'login'], navigationExtras);
      });
    }
  }

}

