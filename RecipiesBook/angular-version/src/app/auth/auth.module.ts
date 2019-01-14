import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from '@angular/forms';
import {SignComponent} from './sign/sign.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ SignComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
