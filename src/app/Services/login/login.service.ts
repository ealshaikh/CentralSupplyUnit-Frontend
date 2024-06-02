import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl = 'https://localhost:7195/api/Login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        const token = response && response.Token ? response.Token : null;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong, please try again later!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = error.error.Message || errorMessage;

      if (error.status === 401) {
        this.toastr.error('Login failed. Please check your credentials.', 'Error', { timeOut: 3000 });
      } else if (error.status === 500) {
        this.toastr.error('Internal Server Error. Please try again later.', 'Error', { timeOut: 3000 });
      } else {
        this.toastr.error('An error occurred during login. Please try again later.', 'Error', { timeOut: 3000 });
      }
    }
    return throwError(errorMessage);
  }
}
