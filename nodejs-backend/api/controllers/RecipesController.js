'use strict';


var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes');

exports.list_all_recipes = function(req, res) {
    Recipe.find({}, function(err, recipe) {
        if (err)
            res.send(err);
        var response = res.json(recipe);
        console.log('GET recipes: \n' + recipe);
        return response;
    });
};




exports.create_a_recipe = function(req, res) {
    var new_recipe = new Recipe(req.body);
    new_recipe.save(function(err, recipe) {
        if (err)
            res.send(err);
        var response = res.json(recipe);
        console.log('POST recipe: \n' + recipe);
        return response;
    });
};


// exports.read_a_task = function(req, res) {
//     Task.findById(req.params.taskId, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.update_a_task = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };
//
//
// exports.delete_a_task = function(req, res) {
//
//
//     Task.remove({
//         _id: req.params.taskId
//     }, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task successfully deleted' });
//     });
// };
