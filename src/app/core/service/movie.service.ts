import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './../models/movie';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { take, map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
    public _years: Set<number> = new Set<number>();
    public years$: BehaviorSubject<number[]> =
      new BehaviorSubject<number[]>(Array.from(this._years).sort());
    public moviesCounter: number = 0;

  constructor(private httpClient: HttpClient) { }

  public async allMovies() {
    this._years = new Set<number>();
    const apiRoute = `${environment.apiRoot}movie`;
    try {
      const movies = await fetch(apiRoute);
      console.log(`Movies : ${JSON.stringify(movies)}`);
    } catch (error) {
      // if something went wrong
      console.log('something went wrong :' + error);
    }
  }

  public all(): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute)
    .pipe(
      take(1),
      map((response) => {
        this.moviesCounter = response.length;
        return response.map((item) => {
        this._years.add(item.year);
        this.years$.next(Array.from(this._years).sort());
        return new Movie().deserialize(item);
      });
     })
    );
  }

  public byTitle(title: string): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute = `${environment.apiRoot}movie/byTitleP?t=${title}`;
    return this.httpClient.get<any[]> (apiRoute)
    .pipe(
      take(1),
      map((response) => {
        this.moviesCounter = response.length;
        return response.map((item) => {
        this._years.add(item.year);
        this.years$.next(Array.from(this._years).sort());
        return new Movie().deserialize(item);
      });
     })
    );
  }

  public byId(id: number): Observable<any> {
    const apiRoot = `${environment.apiRoot}movie/${id}`;
    return this.httpClient.get<any>(
      apiRoot,
      {
        observe: 'response'
      }
    )
    .pipe(
      take(1),
      map((response) => {
        return response.body;
      }),
      catchError((error: any) => {
        console.log(`Something went wrong : ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  public update(movie: any): Observable<HttpResponse<any>> {
    const apiRoute = `${environment.apiRoot}movie/modify`;

    return this.httpClient.put(
      apiRoute,
      movie,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      })
    );
  }

  public delete(movie: Movie): Observable<any> {
    const apiRoute = `${environment.apiRoot}movie/deleteMovie/${movie.idMovie}`;

    return this.httpClient.delete(
      apiRoute
    ).pipe(
      take(1),
      map((response) => {
        return response;
      })
    );
  }
}
