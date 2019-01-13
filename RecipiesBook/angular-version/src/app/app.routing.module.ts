import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {SelectRecipeDetailComponent} from './recipes/recipe-detail/select-recipe-detail/select-recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignComponent} from './auth/sign/sign.component';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: SelectRecipeDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignComponent,  data : {action : 'Sing Up'}},
  {path: 'signin', component: SignComponent,  data : {action : 'Sing In'}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

