import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationChange = new Subject<boolean>();

  constructor(private router: Router) {
  }

  ['Sing Up'](email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.authenticationChange.next(true);
    });
  }

  ['Sing In'](email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.authenticationChange.next(true);
    });
  }

  getToken(): Promise<string> {
    const currentUser = firebase.auth().currentUser;
    return currentUser ? currentUser.getIdToken() : Promise.resolve(null);
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise(isAuth => this.getToken().then(token => isAuth(token !== null)));
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/signin']);
      this.authenticationChange.next(false);
    });
  }
}
