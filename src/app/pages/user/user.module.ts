import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatButtonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
