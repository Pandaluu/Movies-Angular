import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { take, catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { of, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieResolver implements Resolve<any> {
  public constructor(
    private movieService: MovieService,
    private route: Router
    ) {}

  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
    ): Observable<any> {
      const id: number = parseInt(route.paramMap.get('id'));

      console.log(`Hello resolver : ${id}`);

      return this.movieService.byId(id)
        .pipe(
          take(1),
          catchError((error: any, caught: any): Observable<any> => {
            console.log(`Something went wrong : ${JSON.stringify(error)}`);
            return this._errorHandler(error);
          })
        );
  }

  private _errorHandler(error: number): Observable<any> {
    if (error === 404) {
      this.route.navigate(['home'], {});
    }
    return of(null);
  }
}
