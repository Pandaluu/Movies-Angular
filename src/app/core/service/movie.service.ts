import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './../models/movie';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
    public _years: Set<number> = new Set<number>();
    public years$: BehaviorSubject<number[]> =
      new BehaviorSubject<number[]>(Array.from(this._years).sort());

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
        return response.map((item) => {
        this._years.add(item.year);
        this.years$.next(Array.from(this._years).sort());
        return new Movie().deserialize(item)
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
        return response.map((item) => {
        this._years.add(item.year);
        this.years$.next(Array.from(this._years).sort());
        return new Movie().deserialize(item)
      });
     })
    );
  }

  public byId(id: number): Observable<any> {
    const apiRoot = `${environment.apiRoot}movie/${id}`;
    return this.httpClient.get<any>(
      apiRoot
    )
    .pipe(
      take(1),
      map((response) => {
        return response;
      })
    );
  }
}
