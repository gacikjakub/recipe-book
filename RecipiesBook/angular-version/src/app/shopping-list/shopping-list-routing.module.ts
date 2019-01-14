import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list.component';
import {AuthGuardService} from '../auth/auth-guard.service';

const shoppingListRoutes: Routes = [
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [
    RouterModule.forChild(shoppingListRoutes)
  ],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule { }
