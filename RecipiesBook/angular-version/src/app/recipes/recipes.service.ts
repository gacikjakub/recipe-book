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
  private recipes: Recipe[] = [];

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

  setRecipes(recipes: Recipe[]) {
    this.recipes = [...recipes];
    this.recipesUpdate.next(this.getRecipes());
  }
}
