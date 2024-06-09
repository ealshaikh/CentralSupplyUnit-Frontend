import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
   
  ]
})
export class AuthenticationModule { }
