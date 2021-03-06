'use strict';


var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes');

exports.list_all_recipes = function(req, res) {
    Recipe.find({}, function(err, recipe) {
        if (err)
            res.send(err);
        console.log('GET recipes: \n' + recipe);
        res.json(recipe);
    });
};




exports.create_a_recipe = function(req, res) {
    var new_recipe = new Recipe(req.body);
    new_recipe.save(function(err, recipe) {
        if (err)
            res.send(err);
        console.log('POST recipe: \n' + recipe);
        res.json(recipe);
    });
};


exports.read_a_recipe = function(req, res) {
    Recipe.findById(req.params.recipeId, function(err, recipe) {
        if (err)
            res.send(err);
        console.log('GET recipe with id:' + req.params.recipeId + '\n' + recipe);
        res.json(recipe);
    });
};


exports.update_a_recipe = function(req, res) {
    Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function(err, recipe) {
        if (err)
            res.send(err);
        console.log('PUT recipe with id:' + req.params.recipeId + '\n' + recipe);
        res.json(recipe);
    });
};


exports.delete_a_recipe = function(req, res) {
    Recipe.remove({
        _id: req.params.recipeId
    }, function(err, recipe) {
        if (err)
            res.send(err);
        console.log('DELETE recipe with id:' + req.params.recipeId + '\n' + recipe);
        res.json({ message: 'Recipe successfully deleted' });
    });
};
