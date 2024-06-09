import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { APP } from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  CreateRole(formData: any): Observable<any> {
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    console.log(httpOptions)
    const apiUrl = `${environment.baseUrl}/${environment.endpoint}/${APP.ROLE.ADD}`;
    return this.http.post<any>(apiUrl, formData, httpOptions);
  }

  UpdateRole(roleData: any): Observable<any> {
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    const apiUrl = `${environment.baseUrl}/${environment.endpoint}/${APP.ROLE.UPDATE}`;
    return this.http.post<any>(apiUrl, roleData, httpOptions);
  }

  DeleteRole(roleId: number): Observable<any> {
    const url = `${environment.baseUrl}/${environment.endpoint}/${APP.ROLE.DELETE}/${roleId}`;
    const httpOptions = {
      headers: this.jwtService.getHeader()
    };
    return this.http.post<any>(url, { id: roleId }, httpOptions);
  }

  GetAllRoles(): Observable<any> {
    const headers = this.jwtService.getHeader();
    const apiUrl = `${environment.baseUrl}/${environment.endpoint}/${APP.ROLE.VIEW}`;
    return this.http.get<any>(apiUrl, { headers });
  }
}
