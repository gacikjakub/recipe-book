import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {RecipesService} from './recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService, RecipesService],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
