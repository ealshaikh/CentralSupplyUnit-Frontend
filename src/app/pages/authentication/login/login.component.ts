import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl, Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { loginCredentials } from 'src/app/Services/login/loginCredentials.interface';
import { LoginService } from 'src/app/Services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    NgxSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class LoginComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  onSubmit() {
    this.spinner.show();

    if (this.loginForm.valid) {
      const loginCredentials: loginCredentials = {
        email: this.loginForm.value.email!.toLowerCase(),
        password: this.loginForm.value.password!
      };

      this.loginService.login(loginCredentials).subscribe(
        result => {
          if (result) {
            const token = result.token;
            localStorage.setItem('token', token);
            this.router.navigate(['/dashboard']);
            this.toaster.success('Login Successful. You are now logged in.', 'Success', { timeOut: 3000 });
          }
          this.spinner.hide();
        },
        error => {
          if (error.status === 401) {
            this.toaster.error('Check your credentials and try again.', 'Unauthorized', { timeOut: 3000 });
          } else {
            this.toaster.error('An unexpected error occurred. Please try again later.', 'Error', { timeOut: 3000 });
          } this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }



}