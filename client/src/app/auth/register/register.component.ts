import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        company: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.matchingPasswordsValidator }
      // { updateOn: 'blur' }
    );
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get company() {
    return this.form.get('company');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  /** confirmPassword must match the given password */
  matchingPasswordsValidator: ValidatorFn = (control: FormGroup) => {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    return password === confirmPassword ? null : { mismatched: true };
  };

  register() {
    console.log(this.form.value);
    this.loading = true;
    const { firstName, lastName, company, email, password } = this.form.value;
    const user = { firstName, lastName, company, email, password };
    console.log(user);
    // this.userService.createNewUser(user).subscribe(
    //   () => {
    //     this.loading = false;
    //     console.log('User is registered');
    //     this.router.navigateByUrl('login');
    //   },
    //   err => {
    //     this.loading = false;
    //     this.errorMessage = err.error.message;
    //     console.error(err);
    //   }
    // );
  }

  goBack(): void {
    this.location.back();
  }
}
