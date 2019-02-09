import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  navigationSubscription;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.loadRecipes();
      }
    });
  }

  loadRecipes() {
    this.recipesService.getRecipes().then(recipes => {
      this.recipes = recipes as Recipe[];
    });
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
