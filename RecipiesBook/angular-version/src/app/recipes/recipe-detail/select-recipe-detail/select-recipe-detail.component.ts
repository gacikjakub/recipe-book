import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../../recipes.service';
import {Recipe} from '../../recipe.model';

@Component({
  selector: 'app-select-recipe-detail',
  templateUrl: './select-recipe-detail.component.html',
  styleUrls: ['./select-recipe-detail.component.css']
})
export class SelectRecipeDetailComponent implements OnInit {
  shouldDisplay = false;

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit() {
    // this.shouldDisplay = this.recipeService.getRecipes().length !== 0;
    this.recipeService.getRecipes().subscribe(recipes =>
      this.shouldDisplay = recipes.length !== 0);
  }
}
