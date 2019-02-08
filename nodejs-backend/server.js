var cors = require('cors');

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Recipe = require('./api/models/RecipesModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RecipesBookDB');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var routes = require('./api/routes/RecipesRoutes');
routes(app);
app.listen(port);

console.log('Recipe book RESTful API server started on: ' + port);