import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './core/home/home.component';
import {HttpHeaders} from '@angular/common/http';

export const BACKEND_URL: String = 'http://localhost:3000';
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    // RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

