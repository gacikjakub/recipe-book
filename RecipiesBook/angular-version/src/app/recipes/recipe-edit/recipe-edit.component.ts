import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: string;
  recipeForm: FormGroup;
  recipeImgPath = '';
  recipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['_id'];
      this.editMode = params['_id'] != null;
      console.log('_id: ' + params['_id']);
      this.initForm(params['_id']);
    });
  }

  private initForm(id: string) {
    if (this.editMode) {
      console.log('I\'m in edit mode');
      this.recipeService.getRecipeById(id).then(recipe => {
        const ingredients = recipe.ingredients.map(ingredient => this.createIngredientFormGroup(ingredient.name, ingredient.amount));
        this.recipeForm = new FormGroup({
          'name': new FormControl(recipe.name, Validators.required),
          'imagePath': new FormControl(recipe.imagePath, Validators.required),
          'description': new FormControl(recipe.description, Validators.required),
          'ingredients': new FormArray(ingredients),
        });
      });
    } else {
      this.recipeForm = new FormGroup({
        'name': new FormControl('', Validators.required),
        'imagePath': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'ingredients': new FormArray([]),
      });
    }
  }

  getIngredientControls() {
    // return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onIngredientAdded() {
    // (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredientFormGroup());
  }
  onDeleteIngredient(index: number) {
    // (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // this.recipeForm.markAsDirty();
  }
  saveRecipe() {
    this.editMode ? this.recipeService.updateRecipe(this.recipeForm.value, this.id) :
      this.recipeService.addRecipe({...this.recipeForm.value});
      console.log({...this.recipeForm.value});
      console.log()

    this.router.navigate(['/recipes']);
  }

  cancelRecipe() {
    this.router.navigate(['/recipes']);
  }

  private createIngredientFormGroup(name?: string, amount?: number): FormGroup {
    return new FormGroup(
      {
        'name': new FormControl(name, Validators.required),
        'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
      });
  }
}
