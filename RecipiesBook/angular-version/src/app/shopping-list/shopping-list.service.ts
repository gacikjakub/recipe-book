import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 15),
    new Ingredient('Potatoes', 7),
  ];

  ingredientsChange = new EventEmitter<Ingredient[]>();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  getIngredients() {
    return [...this.ingredients];
  }

  addToIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit([...this.ingredients]);
  }

  addAllIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.emit([...ingredients]);
    this.router.navigate(['shopping-list'], {relativeTo: this.route});
  }
}
