import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DATABASE_URL, httpOptions} from '../app.routing.module';

@Injectable({providedIn: 'root'})
export class RecipesService {

  constructor(private shoppingListService: ShoppingListService, private httpClient: HttpClient) {
  }

  getRecipes(): Observable<any> {
    return this.httpClient.get(DATABASE_URL + '/recipes');
  }

  getRecipeById(id: string): Promise<Recipe> {
    console.log('_id: ' + id);
    return <Promise<Recipe>>this.httpClient.get(DATABASE_URL + '/recipes/' + id).toPromise();
  }

  addRecipe(recipe: Recipe) {
    console.log('BEFORE POST');
    console.log('recipeName: ' +  recipe.name)
    const response = this.httpClient.post<any>(DATABASE_URL + '/recipes', recipe  , httpOptions);
    console.log('AFTER POST');
    response.subscribe(res => console.log(res));
    return response;
  }

  updateRecipe(recipe: Recipe, id: string) {
    this.httpClient.put<any>(DATABASE_URL + '/recipes/' + id, recipe, httpOptions).subscribe();
  }

  deleteRecipe(id: string) {
    this.httpClient.delete(DATABASE_URL + '/recipes/' + id, httpOptions).subscribe();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addAllIngredients(ingredients);
  }
}
