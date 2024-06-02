import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }


  CreateRole(formData: any): Observable<any> {
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    const apiUrl = 'https://localhost:7195/api/Role/add'
    return this.http.post<any>(apiUrl, formData, httpOptions);

  }
  UpdateRole(roleData: any): Observable<any> {
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    const apiUrl = 'https://localhost:7195/api/Role/update';
    return this.http.put<any>(apiUrl, roleData, httpOptions);
  }
  
  DeleteRole(roleId: number) {
    const url = `https://localhost:7195/api/Role/delete/${roleId}`;
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    return this.http.delete(url, httpOptions);
  }
  
  GetAllRoles() {
    const headers = this.jwtService.getHeader();
    const apiUrl = 'https://localhost:7195/api/Role/list';
    return this.http.get<any>(apiUrl, { headers });

  }
}
