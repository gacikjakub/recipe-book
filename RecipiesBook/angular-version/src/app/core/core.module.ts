import {NgModule} from '@angular/core';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from '../app.routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from '../shared/authentication-interceptor';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
})
export class CoreModule {
}
