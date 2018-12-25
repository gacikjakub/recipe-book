import {Component, OnInit} from '@angular/core';
import {RecipesService} from './recipes.service';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  private selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipesService.recipeSelection.subscribe(recipe => this.selectedRecipe = recipe);
  }
}
