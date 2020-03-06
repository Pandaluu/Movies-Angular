import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';

import { take, map } from 'rxjs/operators';
import { Observable, Subscription, from } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';

import { WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../../environments/environment';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { TranslateService, TranslationChangeEvent, LangChangeEvent } from '@ngx-translate/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('heartGrowing', [
      state('initial', style ({
        transform: 'scale(1)',
        color: 'red'
      })),
      state('final', style ({
        transform: 'scale(2.0)',
        color: 'red'
      })),
    transition('initial=>final', animate('900ms')),
    transition('final=>initial', animate('900ms'))
    ]),
    trigger('heartSmalling', [
      state('initial', style ({
        transform: 'scale(2.0)',
        color: 'red'
      })),
      state('final', style ({
        transform: 'scale(1)',
        color: 'red'
      })),
    transition('initial=>final', animate('900ms')),
    transition('final=>initial', animate('900ms'))
    ])
  ]
})

export class HomeComponent implements OnInit, OnDestroy {
  public title = 'movies';
  public defaultYear = 0;
  public years: number[] = [];
  public yearSubscription: Subscription;

  public movies: Observable<Movie[]>;

  private socket$: WebSocketSubject<any>;

  private translationChange$: any;

  // private langChange$: EventEmitter<LangChangeEvent>;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.socket$ = new WebSocketSubject<any>(environment.wssAdress);
    this.socket$.subscribe((socketMessage: any) => {
      if (socketMessage._message === 'like') {
        // Update interface for this movie
        let movie: Movie = new Movie().deserialize(socketMessage._data);
        console.log(`Update come frome wsServer : ${JSON.stringify(movie)}`);

        // Update movie in observable
        this.movies = this.movies.pipe(
          map((movies: Movie[]): Movie[] => {
            let movieIndex: number = movies.findIndex(
              (obj: Movie, index: number) => obj.idMovie === movie.idMovie
            );
            movies[movieIndex] = movie;
            return movies;
          })
        );
      }
    },
      (err) => console.error('Erreur levée :' + JSON.stringify(err)),
      () => console.warn('Completed !')
    );

    this.translationChange$ = this.translateService.onTranslationChange;
    this.translationChange$.subscribe((event: any) => {
      console.log('Language was changed');
      this.movies = this.movies.pipe(
        map((movies: Movie[]): Movie[] => {
          return movies;
        })
      );
    });

    this.movies = this.movieService.all();

    this.yearSubscription = this.movieService.years$
      .subscribe((_years) => {
        console.log('Years was updated :' + JSON.stringify(_years));
        this.years = _years;
      });
  }

  ngOnDestroy(): void {
    this.yearSubscription.unsubscribe();
    this.translationChange$.unsubscribe();
    // this.langChange$.unsubscribe();
  }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received ${JSON.stringify(this.movies)}`);
  }

  public moveTo(idMovie: number): void {
    if (this.userService.user && this.userService.user !== null) {
      this.router.navigate(['../', 'movie', idMovie]);
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
        const navigationExtras: NavigationExtras = { state: { movie: idMovie } };
        this.router.navigate(['../', 'login'], navigationExtras);
      });
    }
  }


  public likeIt(movie: Movie): void {
    movie.animationState = 'final';

    setTimeout(() => {
      movie.like = movie.like + 1;
      // Emit a new update to ws...
      const message: any = {
        message: 'like',
        data: movie
      };
      this.socket$.next(message);

      // Update the observable (retains value)
      this.movies = this.movies.pipe(
        map((movies: Movie[]): Movie[] => {
          const movieIndex: number = movies.findIndex((obj: Movie, index: number) => obj.idMovie == movie.idMovie);
          movies[movieIndex] = movie;
          return movies;
        })
      );
      movie.animationState = 'initial';

      setTimeout(() => movie.animationState = 'final', 900);
    }, 900);
  }
}

