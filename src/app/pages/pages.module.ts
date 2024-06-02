import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { StarterComponent } from './starter/starter.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    StarterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
