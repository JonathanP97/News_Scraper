var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');

var PORT = 3000;
var app = express();
var db = require("./models");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.Promise = Promise; 
mongoose.connect("mongodb://localhost/news_scraper", {
  useMongoClient: true
});

db.User.create({
	username: "Elizabeth",
	password: "pass"
}).then( function(user) {
	console.log(user);
}).catch(function(err) {
	console.log(err.message);
});

app.get("/", function(req, res) {
	
});

app.get("/users", function(req, res) {
	db.User.find({}).then(function(user) {
		res.json(user);
	}).catch(function(err) {
		res.json(err);
	});
});

app.get("/posts", function(req, res) {
	db.Post.find({}).then(function(posts) {
		res.json(posts);
	}).catch(function(err) {
		res.json(err);
	});
});



app.listen(PORT, function() {
	console.log("Running on port: " + PORT);
});