import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  public searchForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder) { }

  public get searchTerm(): AbstractControl {
      return this.searchForm.controls.searchTerm;
  }

  public reload(): void {
    if (this.searchTerm.value.trim().length === 0) {
      console.log('Have ro reload all movies');
    }
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [ // controle formulaire
        '', // default value for the control
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ]
    });
  }

  public doSearch(): void {
    if (this.searchTerm.value.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.byTitle(this.searchTerm.value.trim())
        .pipe(
          take(1)
        )
      .subscribe((Response: Movie[]) => {
        movies = Response.map((movie: any) => {
          return new Movie().deserialize(movie);
        });
        console.log(`Emit : ${JSON.stringify(movies)}`);
        this.movies.emit(movies);
      });
    }
  }

  // public onKey($event: any) {
  //   if ($event.target.value.toString().trim().lenght >= 2) {
  //     this.searchTerm += $event.target.value;
  //   }
  //   console.log(this.searchTerm);
  // }
}
