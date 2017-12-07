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


app.get("/", function(req, res) {
	res.send("./public/index.html");
});

app.get("/users", function(req, res) {
	db.User.find({}).then(function(user) {
		res.json(user);
	}).catch(function(err) {
		res.json(err);
	});
});

app.get("/users/:id", function(req, res) {
	console.log(req.params);
	db.User.find({"_id": req.params.id}).then(function(user) {
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
	scrape();
});

function scrape() {
request("https://www.reddit.com/r/hiphopheads", function(error, response, html) {
  var $ = cheerio.load(html);
  var results = [];

  $("p.title").each(function(i, element) {
  	var title = $(element).children("a").text();
  	var link = $(element).children("a").attr("href");

  	results.push({
  	  post: i,
  	  title: title,
  	  link: link	
  	});
  });
  console.log(results);
})
}