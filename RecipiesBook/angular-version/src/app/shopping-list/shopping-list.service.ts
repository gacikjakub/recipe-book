import {Ingredient} from '../shared/ingredient.model';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class ShoppingListService {
  private ingredients = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 15),
    new Ingredient('Potatoes', 7),
  ];
  ingredientsChange = new Subject<Ingredient[]>();

  ingredientSelectionChange = new Subject<Ingredient>();

  private findIngredientPredicate = flag => paramIngredient => arrayIngredient => {
    return ({...paramIngredient}.name.toLocaleLowerCase() === {...arrayIngredient}.name.toLocaleLowerCase()) === flag;
  }

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  getIngredients() {
    return [...this.ingredients];
  }

  addToIngredients(ingredient: Ingredient) {
    const ingredientIndex = _.findIndex(this.ingredients, this.findIngredientPredicate(true)(ingredient));
    this.ingredients[ingredientIndex === -1 ? this.ingredients.length : ingredientIndex] = {...ingredient};
    this.ingredientsChange.next([...this.ingredients]);
  }

  addAllIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      const ingredientIndex = _.findIndex(this.ingredients, this.findIngredientPredicate(true)(ingredient));
      ingredientIndex === -1 ?
        this.ingredients.push(ingredient)
        :
        this.ingredients[ingredientIndex].amount += ingredient.amount;
    });
    this.ingredientsChange.next([...ingredients]);
    this.router.navigate(['shopping-list'], {relativeTo: this.route});
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(this.findIngredientPredicate(false)(ingredient));
    this.ingredientsChange.next([...this.ingredients]);
  }

  selectIngredient(ingredient: Ingredient) {
    this.ingredientSelectionChange.next(ingredient);
  }
}
