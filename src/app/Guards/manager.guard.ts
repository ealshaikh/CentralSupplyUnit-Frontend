import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../Services/login/login.service';

@Injectable({
  providedIn: 'root'
})

export class ManagerRoleGuard implements CanActivate {
  constructor(private router: Router,private authService: LoginService) {}

  canActivate(): boolean {
    const roleId = this.authService.getRoleId();
    if (roleId == 2 || roleId ==1) {
      return true;
    } else {
      this.router.navigate(['**']); 
      return false;
    }
  }

}

