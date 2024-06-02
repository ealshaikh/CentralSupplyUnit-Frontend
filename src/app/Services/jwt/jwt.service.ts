import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  public getHeader() {
    const token = localStorage.getItem('token')!;
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      });
    }

    return new HttpHeaders({
      'accept': 'application/json'
    });

  }
}
