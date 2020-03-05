import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public _idMovie: number;
  public _navigation: Navigation;
  public processing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar) {
    this._navigation = this.router.getCurrentNavigation();
  }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {
    if (this._navigation.extras && this._navigation.extras.state) {
      const state = this._navigation.extras.state as { movie: number };
    }
    const state = this._navigation.extras.state as { movie: number };
    if (state.hasOwnProperty('movie')) {
      this._idMovie = state.movie;
    }
    console.log(`Extras state: ${this._idMovie}`);

    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      password: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ]
    });
  }

  public doLogin() {
    // Local persistence of user
    this.processing = true;

    this.userService.authenticate(this.loginForm.value).then((status: boolean) => {
      this.processing = false;
      console.log('Never say never!');
      if (status) {
        if (this._idMovie === undefined) {
          // Road to home
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['../', 'movie', this._idMovie]);
        }
      } else {
        this.snackBar.open(
          'Sorry, your identification failed!',
          '',
          {
            duration: 2500,
            verticalPosition: 'top'
          }
        );
        this.login.setValue('');
        this.password.setValue('');
      }
    });
  }
  public doRegister() {
    this.router.navigate(['register']);
  }
}
