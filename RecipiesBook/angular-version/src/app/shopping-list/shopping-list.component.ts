import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  filterStatus = '';
  private ingredientsChangeSubscription: Subscription;
  private ingredientInputChangeSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangeSubscription = this.shoppingListService.ingredientsChange
      .subscribe(changedIngredients => this.ingredients = changedIngredients);
    this.ingredientInputChangeSubscription = this.shoppingListService.ingredientInputChange
      .subscribe(inputChanged => this.filterStatus = inputChanged);
  }

  ngOnDestroy(): void {
    this.ingredientsChangeSubscription.unsubscribe();
    this.ingredientInputChangeSubscription.unsubscribe();
  }

  onIngredientSelected(ingredient: Ingredient) {
    this.shoppingListService.selectIngredient(ingredient);
  }
}
