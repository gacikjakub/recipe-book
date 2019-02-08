import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {SelectRecipeDetailComponent} from './recipe-detail/select-recipe-detail/select-recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {path: '', component: SelectRecipeDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':_id', component: RecipeDetailComponent},
      {path: ':_id/edit', component: RecipeEditComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
