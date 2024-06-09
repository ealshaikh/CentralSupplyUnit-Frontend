import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/Services/role/role.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, TableCell } from 'pdfmake/interfaces';
import { UserService } from 'src/app/Services/user/user.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {
  @ViewChild('addDialogContent') addDialogContent!: TemplateRef<any>;
  @ViewChild('updateDialogContent') updateDialogContent!: TemplateRef<any>;

  dialogRef!: MatDialogRef<any>;

  userSubscription!: Subscription;
  userData: any[] = [];
  roleData: any[] = [];
  displayedColumns: string[] = [
    'FullName',
    'UserName',
    'Email',
    'Role',
    'Action',
  ];

  AddUserForm = new FormGroup({
    roleid: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    lastname: new FormControl('', [Validators.required]),

  });

  UpdateUserForm = new FormGroup({
    userid: new FormControl('', [Validators.required]),
    roleid: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    lastname: new FormControl('', [Validators.required]),
  });


  constructor(private _roleService: RoleService,
    private _userService: UserService, private _toaster: ToastrService, public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.getAllRoles();
  }

  getAllRoles() {
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

  fetchUsers() {
    this._userService.GetAllUsers().subscribe(
      (response: any) => {
        if (response) {
          this.userData = response.users.filter((role: any) => role.roleid !== 1);
        } else {
          console.error('Error: User data is empty or not in the expected format');
          this.userData = [];
        }
      },
      (error: any) => {
        console.error('Error fetching users:', error);
        this.userData = [];
      }
    );
  }


  generatePassword(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+';
    const passwordLength = 6;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    this.AddUserForm.get('password')?.setValue(password);
  }

  openAddDialog(): void {
    this.dialogRef = this.dialog.open(this.addDialogContent, {
      width: '560px',
      height: '530px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.AddUserForm.reset();

    });
  }

  openUpdateDialog(element: any) {
    this.dialogRef = this.dialog.open(this.updateDialogContent, {
      width: '560px',
      height: '530px',
    });
    console.log

    this.UpdateUserForm.patchValue({
      userid:element.userid,
      firstname: element.firstname,
      lastname: element.lastname,
      email: element.email,
      password: element.password,
      roleid: element.roleid
    })

    this.dialogRef.afterClosed().subscribe(result => {

    });
  }

  onSubmitAdd() {
    console.log(this.AddUserForm.value)
    if (this.AddUserForm.valid) {
      const newRole: any = {
        firstname: this.AddUserForm.value.firstname!,
        lastname: this.AddUserForm.value.lastname!,
        email: this.AddUserForm.value.email!,
        password: this.AddUserForm.value.password!,
        roleid: this.AddUserForm.value.roleid!
      }
      this._userService.CreateUser(newRole).subscribe(
        (response: any) => {
          this._toaster.success('User created successfully', 'Success', { timeOut: 3000 });
          this.dialogRef.close();
          this.fetchUsers();

        },
        (error) => {
          this._toaster.error('Error creating new user, please try again!', 'Error', { timeOut: 3000 });

        }
      )
    }
  }



  onSubmitUpdate() {
    if (this.UpdateUserForm.valid) {

      this._userService
        .UpdateUser(this.UpdateUserForm.value)
        .subscribe(
          (response: any) => {
            this._toaster.success(
              'User updated successfully',
              'Success',
              {
                timeOut: 3000,
              },
            );
            this.fetchUsers();

            this.dialogRef.close();
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


  updatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+';
    const passwordLength = 6;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    this.UpdateUserForm.get('password')?.setValue(password);
  }

  ExportToExcel() {
    const fileName = 'User_Report.xlsx';

    const filteredData = this.userData.map(user => ({
      'Full Name': user.firstname+' '+user.lastname,
      'User Name': user.username,
      'Email': user.email,
      'Role Name': user.roleName
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Programs');
    XLSX.writeFile(wb, fileName);
  }

  ExportToPDF() {
    const tableBody: TableCell[][] = [
      [
        { text: 'Full Name', style: 'tableHeader' },
        { text: 'User Name', style: 'tableHeader' },
        { text: 'Role Name', style: 'tableHeader' },
        { text: 'Email', style: 'tableHeader' },

      ],
      ...this.userData.map((row: any) => [
        { text: row.firstname +' '+row.lastname },
        { text: row.username },
        { text: row.roleName },
        { text: row.email },


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

    pdfMake.createPdf(documentDefinition).download('User_Report.pdf');

  }


  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
