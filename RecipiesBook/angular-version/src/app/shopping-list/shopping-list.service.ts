import {Ingredient} from '../shared/ingredient.model';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
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
    const existedIngredient = this.ingredients.find(this.findIngredientPredicate(true)(ingredient));
    existedIngredient ? existedIngredient.amount += ingredient.amount : this.ingredients.push({...ingredient});
    this.ingredientsChange.next([...this.ingredients]);
  }

  addAllIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.next([...ingredients]);
    this.router.navigate(['shopping-list'], {relativeTo: this.route});
  }

  deleteIngredient(ingredient: Ingredient) {
    const existedIngredient = this.ingredients.find(this.findIngredientPredicate(true)(ingredient));
    if (existedIngredient && existedIngredient.amount > ingredient.amount) {
      existedIngredient.amount -= ingredient.amount;
    } else if (existedIngredient) {
      this.ingredients = this.ingredients.filter(this.findIngredientPredicate(false)(ingredient));
    }
    this.ingredientsChange.next([...this.ingredients]);
  }

  selectIngredient(ingredient: Ingredient) {
    this.ingredientSelectionChange.next(ingredient);
  }
}
