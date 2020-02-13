import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { AdminCartComponent } from './admin-cart/admin-cart.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';


@NgModule({
  declarations: [AdminHomeComponent, ViewComponent, EditComponent, AdminCartComponent, AdminOrdersComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'adminhome',component:AdminHomeComponent},
      {path:'view/:productId',component:ViewComponent},
      {path:'edit/:productId',component:EditComponent},
      {path:'admincart',component:AdminCartComponent},
      {path:'adminorders',component:AdminOrdersComponent}
    ])
  ]
})
export class AdminModule { }
