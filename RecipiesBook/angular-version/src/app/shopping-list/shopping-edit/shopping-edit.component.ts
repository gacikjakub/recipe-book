import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameIngredientInput') nameIngredientRef: ElementRef;
  @ViewChild('amountIngredientInput') amountIngredientRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onIngredientAdded() {
    this.shoppingListService.addToIngredients(new Ingredient(this.nameIngredientRef.nativeElement.value,
      this.amountIngredientRef.nativeElement.value));
  }
}
