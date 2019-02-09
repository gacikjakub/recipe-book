import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => { console.log(params['_id']);
        this.recipesService.getRecipeById(params['_id'])
        .then(recipes => {
          console.log(recipes);
          this.recipe = recipes;
        }); });
  }

  onAddToShoppingList() {
    // this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
         this.router.navigate(['edit'], {relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipesService.deleteRecipe(this.recipe._id);
    this.router.navigate(['/recipes']);
  }
}
