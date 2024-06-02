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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    NgxSpinnerModule
  ],
})
export class LoginComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  hide = true;

  Loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  onSubmit() {
    this.spinner.show();

    if (this.Loginform.valid) {
      const loginCredentials: loginCredentials = {
        email: this.Loginform.value.email!.toLowerCase(),
        password: this.Loginform.value.password!
      };

      this.loginService.login(loginCredentials).subscribe(
        result => {
          if (result) {
            const token = result.token;
      
            localStorage.setItem('token', token);
      
            this.router.navigate(['/dashboard']);
            this.toastr.success('Login Successful. You are now logged in.', 'Success', { timeOut: 3000 });
          }
        },
        error => {
          console.error('Error occurred during login:', error);
        }
      );
    }      

    this.spinner.hide();
  }
}