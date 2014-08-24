var mongoose = require('mongoose');
var express = require('express');

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var path = require('path');
var middleware = require('./middleware');

mongoose.set('debug', true);
//  Install module by updating package.json  npm install mongoose --save
//  Install module by updating package.json  npm install express --save
//mongodb://heroku_app28817745:f6106dkmo2qrtdr03ns0t8pm8t@ds063899.mongolab.com:63899/heroku_app28817745
mongoose.connect('mongodb://heroku_app28817745:f6106dkmo2qrtdr03ns0t8pm8t@ds063899.mongolab.com:63899/heroku_app28817745', function(err, db) {
	if (err) throw err;

	var app = express();

	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));

	middleware(app);
	routes(app);

	var port = Number(process.env.PORT || 5000);
	app.listen(port, function () {
		console.log('now listening on http://localhost:' + port);
	})
});