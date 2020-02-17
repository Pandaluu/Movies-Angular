import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/service/movie.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: any;
  public movieForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private formBuilder: FormBuilder) { }

  public get synopsis(): AbstractControl {
      return this.movieForm.controls.synopsis;
    }

  public get title(): AbstractControl {
    return this.movieForm.controls.title;
  }

  public doUpdate() {
    this.movie.synopsis = this.synopsis.value;
    this.movie.title = this.title.value;

    // then... call the service update
    console.log(`Will update : ${JSON.stringify(this.movie)}`);

    this.movieService.update(this.movie)
    .pipe(
      take(1)
    ).subscribe((response: HttpResponse<any>) => {
      console.log(`Update was done with : ${response.status}`);
    });
  }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      synopsis: [
        '',
        Validators.required
      ],
      title: [
        '',
        Validators.required
      ]
    });

    this.route.paramMap.subscribe((paramMap: any) => {
      console.log(`Params : ${paramMap.params.id}`);
      this.movieService.byId(paramMap.params.id).subscribe((movie: any) => {
        this.movie = movie;
        this.synopsis.setValue(this.movie.synopsis);
        this.title.setValue(this.movie.title);
      });
    });
  }

}
