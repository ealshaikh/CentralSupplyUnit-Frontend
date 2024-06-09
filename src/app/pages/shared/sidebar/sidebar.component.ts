import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
   roleId !:number ;

  constructor(private router: Router, private authService: LoginService) { }
  ngOnInit(): void {
    this.roleId = this.authService.getRoleId();
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }
  navigateRole(){
    this.router.navigate(['dashboard/role/data-table'])
  }
  navigateUser(){
    this.router.navigate(['dashboard/user/data-table'])

  }
  navigateWarehouse(){
    this.router.navigate(['dashboard/warehouse/data-table'])

  }
  navigateItem(){
    this.router.navigate(['dashboard/item/data-table'])

  }
  navigateSupplyDoc(){
    this.router.navigate(['dashboard/supplyDocument/data-table'])

  }
}
