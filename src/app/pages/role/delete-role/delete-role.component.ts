import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent {

  constructor(public dialogRef: MatDialogRef<DeleteRoleComponent>) { }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  confirmDelete(): void {
    this.dialogRef.close({ event: 'Delete' });
  }
}
