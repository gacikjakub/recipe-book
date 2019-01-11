import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private BASIC_URL = 'https://ng-recipe-book-e670a.firebaseio.com/data.json';

  constructor(private httpClient: HttpClient, private recipeService: RecipesService,
              private shoppingListService: ShoppingListService) {
  }

  saveData() {
    const dataToSave = {
      recipes: this.recipeService.getRecipes(),
      ingredients: this.shoppingListService.getIngredients(),
    };
    return this.httpClient.put(this.BASIC_URL, dataToSave);
  }

  fetchData() {
    return this.httpClient.get(this.BASIC_URL).subscribe(data => {
      const {recipes = [], ingredients = []} = {...data};
      this.shoppingListService.setIngredients(ingredients);
      this.recipeService.setRecipes(recipes);
    });
  }
}
