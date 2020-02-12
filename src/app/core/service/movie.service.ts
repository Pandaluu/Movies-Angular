import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from './../models/movie';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public async allMovies() {
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
    const apiRoute = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }

  public byTitle(): Observable<Movie[]> {
    const apiRoute = `${environment.apiRoot}byTitleP`;
    return this.httpClient.get<Movie[]> (apiRoute);
  }
}
