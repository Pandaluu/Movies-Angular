import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public _navigation: Navigation;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  public get username(): AbstractControl {
    return this.registerForm.controls.username;
  }

  public get password(): AbstractControl {
    return this.registerForm.controls.password;
  }

  public get firstName(): AbstractControl {
    return this.registerForm.controls.firstName;
  }

  public get lastName(): AbstractControl {
    return this.registerForm.controls.lastName;
  }

ngOnInit(): void {

  this.registerForm = this.formBuilder.group({
    username: [
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
    ],
    firstName: [
      '',
      Validators.compose(
        [Validators.required, Validators.minLength(5)]
      )
    ],
    lastName: [
      '',
      Validators.compose(
        [Validators.required, Validators.minLength(5)]
      )
    ]
  });
}

}
