import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: number;
  recipeForm: FormGroup;
  recipeImgPath = '';

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      this.initForm(+params['id']);
    });
  }

  private initForm(id: number) {
    let recipeName = '';
    let recipeDescription = '';
    let ingredients = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(id);
      recipeName = recipe.name;
      this.recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      ingredients = (recipe.ingredients || [])
        .map(ingredient => this.createIngredientFormGroup(ingredient.name, ingredient.amount));
    }

    const nameControl = {'name': new FormControl(recipeName, Validators.required)};
    const imageURLControl = {'imagePath': new FormControl(this.recipeImgPath, Validators.required)};
    const descriptionControl = {'description': new FormControl(recipeDescription, Validators.required)};
    const ingredientsControl = {'ingredients': new FormArray(ingredients)};

    this.recipeForm = new FormGroup({
      ...nameControl, ...imageURLControl,
      ...descriptionControl, ...ingredientsControl
    });
  }

  getIngredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onIngredientAdded() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredientFormGroup());
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.recipeForm.markAsDirty();
  }
  saveRecipe() {
    this.editMode ? this.recipeService.updateRecipe({
        ...{id: this.id},
        ...this.recipeForm.value
      }) :
      this.recipeService.addRecipe({...this.recipeForm.value});

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
