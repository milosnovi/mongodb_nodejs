var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');
var truncate = require('truncate');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');

var express = require('express');

module.exports = function (app) {

	// home page
	app.get('/', function (req, res, next) {
		BlogPost.find().sort('created').limit(10).exec(function (err, posts) {
			if (err) return next(err);
			for (i = 0; i < posts.length; i++) {
				posts[i].title = truncate(posts[i].title, 20);
				posts[i].body = truncate(posts[i].body, 255);
			}
			console.log(posts);
			res.render('home.jade', { posts: posts });
		});
	});

	// login / logout routes
	login(app);

	// blog post crud
	posts(app);

	// error handlers
	errors(app);
};
