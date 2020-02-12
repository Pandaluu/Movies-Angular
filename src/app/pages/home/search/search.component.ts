import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchTerm: string = '';

  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  public onKey($event: any) {
    if ($event.target.value.toString().trim().lenght >= 2) {
      this.searchTerm += $event.target.value;
    }
    console.log(this.searchTerm);
  }


  public doSearch(): void {
    if (this.searchTerm.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.byTitle(this.searchTerm.trim())
        .pipe(
          take(1)
        )
      .subscribe((Response: Movie[]) => {
        movies = Response.map((movie: any) => {
          return new Movie().deserialize(movie);
        });
        console.log(`Emit : ${JSON.stringify(movies)}`)
        this.movies.emit(movies);
      });
    }
  }
}
