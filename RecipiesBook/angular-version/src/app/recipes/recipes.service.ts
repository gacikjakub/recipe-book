import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL, httpOptions} from '../app.routing.module';

@Injectable({providedIn: 'root'})
export class RecipesService {

  constructor(private shoppingListService: ShoppingListService, private httpClient: HttpClient) {
  }

  getRecipes(): Promise<Recipe[]> {
    return <Promise<Recipe[]>>this.httpClient.get(BACKEND_URL + '/recipes').toPromise();
  }

  getRecipeById(id: string): Promise<Recipe> {
    console.log('_id: ' + id);
    return <Promise<Recipe>>this.httpClient.get(BACKEND_URL + '/recipes/' + id).toPromise();
  }

  addRecipe(recipe: Recipe) {
    const response = this.httpClient.post<any>(BACKEND_URL + '/recipes', recipe  , httpOptions);
    response.subscribe(res => console.log(res));
    return response;
  }

  updateRecipe(recipe: Recipe, id: string) {
    this.httpClient.put<any>(BACKEND_URL + '/recipes/' + id, recipe, httpOptions).subscribe();
  }

  deleteRecipe(id: string) {
    this.httpClient.delete(BACKEND_URL + '/recipes/' + id, httpOptions).subscribe();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addAllIngredients(ingredients);
  }
}
