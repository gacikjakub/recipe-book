import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => next.handle(req.clone({params: req.params.set('auth', token)}))));
  }
}
