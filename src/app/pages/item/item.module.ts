import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ItemModule { }
