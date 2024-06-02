import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/Services/role/role.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'Name',
    'Action',
  ];
  isOffcanvasRightOpen = false;
  isOffcanvasUpdateOpen = false;
  roleSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>([]);
  roleData: any [] = [];
  constructor(private _roleService: RoleService, private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  fetchRoles() {
    this._roleService.GetAllRoles().subscribe(
      (response: any) => {
        if (response && response.roles) {
          this.roleData = response.roles;
          this.dataSource.data = this.roleData;
          console.log(this.roleData);
        } else {
          console.error('Error: Role data is empty or not in the expected format');
          this.roleData = [];
          this.dataSource.data = this.roleData;
        }
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
        this.roleData = [];
        this.dataSource.data = this.roleData;
      }
    );
  }
  
  


  AddRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required])

  });

  UpdateRoleForm = new FormGroup({
    roleid: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])

  });
  toggleOffcanvasRight() {
    this.isOffcanvasRightOpen = !this.isOffcanvasRightOpen;

  }
  closeOffcanvas() {
    this.isOffcanvasRightOpen = false;
    this.AddRoleForm.reset();
  }
  onSubmitAdd() {
    if (this.AddRoleForm.valid) {
      const newRole: any = {
        name: String(this.AddRoleForm.value.name)
      }
      this._roleService.CreateRole(newRole).subscribe(
        (response: any) => {
          this._toastr.success('Role created successfully', 'Success', { timeOut: 3000 });
          this.closeOffcanvas();
          this.fetchRoles();

        },
        (error) => {
          this._toastr.error('Error creating new role, please try again!', 'Error', { timeOut: 3000 });

        }
      )
    }
  }

  onSubmitUpadte() {

  }

  closeOffcanvasUpdate() {
    this.isOffcanvasUpdateOpen = !this.isOffcanvasUpdateOpen;

  }
  ExportToExcel() {

  }

  ExportToPDF() {

  }
}
