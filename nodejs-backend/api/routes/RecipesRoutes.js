'use strict';
module.exports = function(app) {
    var recipes = require('../controllers/RecipesController');

    // Recipes Routes
    app.route('/recipes')
        .get(recipes.list_all_recipes)
        .post(recipes.create_a_recipe);


    app.route('/recipes/:recipeId')
        .get(recipes.read_a_recipe)
        .put(recipes.update_a_recipe)
        .delete(recipes.delete_a_recipe);
};