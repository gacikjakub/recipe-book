import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignComponent} from './sign/sign.component';

const authRoutes: Routes = [
  {path: 'signup', component: SignComponent,  data : {action : 'Sing Up'}},
  {path: 'signin', component: SignComponent,  data : {action : 'Sing In'}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
