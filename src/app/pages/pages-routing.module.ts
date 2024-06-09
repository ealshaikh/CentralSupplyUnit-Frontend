import { RoleModule } from './role/role.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AdminRoleGuard } from '../Guards/adminRole.guard';
import { ManagerRoleGuard } from '../Guards/manager.guard';

const routes: Routes = [
  {
    path:'',
    component:StarterComponent
  },
  {
    path:'warehouse',
    canActivate:[ManagerRoleGuard],
    loadChildren: () => import ('./warehouse/warehouse.module').then((m) => m.WarehouseModule)
  },
  {
    path:'supplyDocument',
    loadChildren: () => import ('./supply-document/supply-document.module').then((m) => m.SupplyDocumentModule)
  },
  {
    path:'user',
    canActivate: [AdminRoleGuard],
    loadChildren: () => import ('./user/user.module').then((m) => m.UserModule)
  }
  ,
  {
    path:'role',
    canActivate: [AdminRoleGuard],
    loadChildren: () => import ('./role/role.module').then((m) => m.RoleModule)
  },
  {
    path:'item',
    canActivate:[ManagerRoleGuard],
    loadChildren: () => import ('./item/item.module').then((m) => m.ItemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
