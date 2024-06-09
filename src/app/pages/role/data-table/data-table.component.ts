import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/Services/role/role.service';
import { DeleteRoleComponent } from '../delete-role/delete-role.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, TableCell } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {
  roleSubscription!: Subscription;
  isOffcanvasRightOpen = false;
  isOffcanvasUpdateOpen = false;
  roleData: any[] = [];
  displayedColumns: string[] = [
    'Name',
    'Action',
  ];
  
  AddRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required])

  });

  UpdateRoleForm = new FormGroup({
    roleid: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])

  });

  constructor(private _roleService: RoleService, private _toaster: ToastrService, public dialog: MatDialog,
  ) { }

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
        if (response) {
          this.roleData = response.roles.filter((role: any) => role.roleid !== 1);
        } else {
          console.error('Error: Role data is empty or not in the expected format');
          this.roleData = [];
        }
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
        this.roleData = [];
      }
    );
  }

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
        name: this.AddRoleForm.value.name!
      }
      this._roleService.CreateRole(newRole).subscribe(
        (response: any) => {
          this._toaster.success('Role created successfully', 'Success', { timeOut: 3000 });
          this.closeOffcanvas();
          this.fetchRoles();

        },
        (error) => {
          this._toaster.error('Error creating new role, please try again!', 'Error', { timeOut: 3000 });

        }
      )
    }
  }

  openUpdateOffCanvas(element: any) {
    this.UpdateRoleForm.patchValue({
      roleid: element?.roleid,
      name: element?.name,
    });
    this.isOffcanvasUpdateOpen = !this.isOffcanvasUpdateOpen;

  }
  onSubmitUpadte() {
    if (this.UpdateRoleForm.valid) {

      this._roleService
        .UpdateRole(this.UpdateRoleForm.value)
        .subscribe(
          (response: any) => {
            this._toaster.success(
              'Role updated successfully',
              'Success',
              {
                timeOut: 3000,
              },
            );
            this.fetchRoles();

            this.closeOffcanvasUpdate();

          },
          (error) => {
            this._toaster.error(
              'Something went wrong, please try again later!',
              'Error',
              {
                timeOut: 3000,
              },
            );
          },
        );
    }
  }



  closeOffcanvasUpdate() {
    this.isOffcanvasUpdateOpen = !this.isOffcanvasUpdateOpen;

  }

  ExportToExcel() {
    const fileName = 'Role_Report.xlsx';

    const filteredData = this.roleData.map(role => ({
      Name: role.name,

    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Programs');
    XLSX.writeFile(wb, fileName);
  }

  ExportToPDF() {
    const tableBody: TableCell[][] = [
      [
        { text: 'Name', style: 'tableHeader' },

      ],
      ...this.roleData.map((row: any) => [
        { text: row.name },

      ])
    ];

    const documentDefinition: TDocumentDefinitions = {

      
      content: [
        {
          table: {
            headerRows: 1,
            body: tableBody,

            
          },
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 12,
          fillColor: '#CCCCCC',
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download('Role_Report.pdf');

  }

  openDeleteDialog(roleId: number): void {
    const dialogRef = this.dialog.open(DeleteRoleComponent, {
      width: '350px',
      height: '170px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event === 'Delete') {
        this.deleteRole(roleId);
      }
    });

  }


  deleteRole(roleId: number): void {
    this._roleService.DeleteRole(roleId).subscribe(
      () => {
        this._toaster.success('Role deleted successfully', 'Success', {
          timeOut: 3000,
        });
        this.fetchRoles();
      },
      (error) => {
        this._toaster.error('Error deleting role', 'Error', { timeOut: 3000 });
      },
    );
  }
}
