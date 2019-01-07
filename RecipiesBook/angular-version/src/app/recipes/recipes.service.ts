import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesService {

  constructor(private shoppingListService: ShoppingListService) {
  }

  recipesUpdate = new Subject<Recipe[]>();
  private idGenerator = function* () {
    let index = 1;
    while (true) {
      yield index++;
    }
  }();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1)],
      this.idGenerator.next().value),
    new Recipe(
      'Big fat burger',
      'What else you need to say ?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 10)],
      this.idGenerator.next().value)];

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipeById(id: number): Recipe {
    return {...this.recipes.find(recipe => recipe.id === id)};
  }

  addRecipe(recipe: Recipe) {
    this.recipes = [...this.recipes, {...recipe, ...{id: this.idGenerator.next().value}}];
    this.recipesUpdate.next(this.getRecipes());
  }

  updateRecipe(recipe: Recipe) {
    this.recipes[this.recipes.findIndex(rec => rec.id === recipe.id)] = {...recipe};
    this.recipesUpdate.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.recipesUpdate.next(this.getRecipes());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addAllIngredients(ingredients);
  }
}
