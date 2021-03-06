import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  selectedIngredientChangeSubscription: Subscription;
  formIngredient = new Ingredient('', 1);


  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.selectedIngredientChangeSubscription = this.shoppingListService.ingredientSelectionChange
      .subscribe(selectedIngredient => {
        this.formIngredient = {...selectedIngredient};
        this.onIngredientInputChange(this.formIngredient.name);
      });
  }

  ngOnDestroy(): void {
    this.selectedIngredientChangeSubscription.unsubscribe();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addToIngredients(ingredient);
  }

  onIngredientDeleted(ingredientsForm: NgForm) {
    this.shoppingListService.deleteIngredient(ingredientsForm.value);
    ingredientsForm.reset();
  }

  onIngredientInputChange(inputValue: string) {
    this.shoppingListService.ingredientInputChange.next(inputValue);
  }
}
