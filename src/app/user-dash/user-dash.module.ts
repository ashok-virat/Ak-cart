import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartComponent } from './cart/cart.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductViewComponent } from './product-view/product-view.component';



@NgModule({
  declarations: [UserHomeComponent, CartComponent, MyOrderComponent, ProductViewComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {path:'userhome',component:UserHomeComponent},
      {path:'cart',component:CartComponent},
      {path:'myorder',component:MyOrderComponent},
      {path:'viewproduct/:productId',component:ProductViewComponent}
    ])
  ]
})
export class UserDashModule { }
