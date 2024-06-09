import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }


  CreateUser(formData: any): Observable<any> {
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    const apiUrl = 'https://localhost:7195/api/user/add'
    return this.http.post<any>(apiUrl, formData, httpOptions);

  }
  UpdateUser(UserData: any): Observable<any> {
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    const apiUrl = 'https://localhost:7195/api/user/update';
    return this.http.put<any>(apiUrl, UserData, httpOptions);
  }
  
  DeleteUser(userId: number) {
    const url = `https://localhost:7195/api/user/delete/${userId}`;
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    return this.http.delete(url, httpOptions);
  }
  
  GetAllUsers() {
    const headers = this.jwtService.getHeader();
    const apiUrl = 'https://localhost:7195/api/user/list';
    return this.http.get<any>(apiUrl, { headers });

  }
}
