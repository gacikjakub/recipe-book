var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecipeSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of meal'
    },
    description: {
        type: String,
    },
    imagePath: {
      type: String,
    },
    ingredients: {
        type: [{
            name: {
                type: String,
                required: 'Enter ingredient name'
            },
            amount: {
                type: Number
            }
        }],
    }
});

module.exports = mongoose.model('Recipes', RecipeSchema);