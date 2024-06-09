import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environment';
import { APP } from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = `${environment.baseUrl}/${environment.endpoint}/${APP.AUTH.LOGIN}`;

  constructor(
    private http: HttpClient) { }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        const token = response && response.Token ? response.Token : null;
        if (token) {
          localStorage.setItem('token', token);
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}

