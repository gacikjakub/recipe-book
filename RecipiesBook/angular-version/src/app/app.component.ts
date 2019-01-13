import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {RecipesService} from './recipes/recipes.service';
import {DataStorageService} from './shared/data-storage.service';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService, RecipesService, DataStorageService, AuthService, AuthGuardService],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      // credentials leaved on purpose, because is learning project,
      // normally they would be set via environment variables.
      apiKey: 'AIzaSyAv-Vqn8YKZEPbkzF9xofjgfX8Uh_Gcrqw',
      authDomain: 'ng-recipe-book-e670a.firebaseapp.com',
    });
  }
}
