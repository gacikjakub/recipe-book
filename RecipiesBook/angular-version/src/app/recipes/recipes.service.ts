import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DATABASE_URL, httpOptions} from '../app.routing.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesService {

  constructor(private shoppingListService: ShoppingListService, private httpClient: HttpClient) {
  }

  recipesUpdate = new Subject<Recipe[]>();
  private idGenerator = function* () {
    let index = 1;
    while (true) {
      yield index++;
    }
  }();
  private recipes: Recipe[] = [];

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getRecipes(): Observable<any> {
    return this.httpClient.get(DATABASE_URL + '/recipes').pipe(
      map(this.extractData)
    );
  }

  getRecipeById(id: number): Recipe {
    return {...this.recipes.find(recipe => recipe.id === id)};
  }

  addRecipe(recipe: Recipe) {
    const newRecipe = {... recipe, ...{id: this.idGenerator.next().value}};
    this.recipes = [...this.recipes, newRecipe];
    const response = this.httpClient.post<any>(DATABASE_URL + '/recipes', newRecipe, httpOptions);
    response.subscribe(res => console.log(res));
    return response;
  }

  updateRecipe(recipe: Recipe) {
    const newRecipe = {... recipe, ...{id: this.idGenerator.next().value}};
    this.httpClient.put<any>(DATABASE_URL + '/recipes', newRecipe, httpOptions);
    this.recipes[this.recipes.findIndex(rec => rec.id === recipe.id)] = {...recipe};
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    // this.recipesUpdate.next(this.getRecipes());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addAllIngredients(ingredients);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = [...recipes];
    // this.recipesUpdate.next(this.getRecipes());
  }
}
