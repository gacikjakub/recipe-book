import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './core/home/home.component';
import {AuthGuardService} from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuardService]},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule', canLoad: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

