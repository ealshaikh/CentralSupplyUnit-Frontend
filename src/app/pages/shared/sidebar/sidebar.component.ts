import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }
  navigateRole(){
    this.router.navigate(['dashboard/role/data-table'])
  }
}
