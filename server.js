var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');
var axios = require('axios');

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
});

app.get("/scrape", function(req, res) {
  axios.get("https://www.reddit.com/r/gamedeals").then(function(response) { 
    var $ = cheerio.load(response.data);

    $("div.top-matter").each(function(i, element) {
      var title = $(element).children("p.title").text();
      var link = $(element).children("p.title").children("a").attr("href");
      var author = $(element).children("p.tagline").children("a").text();
      var date = $(element).children("p.tagline").children("time").attr("title");

      var result = {
        title: title,
        link: link,
        author: author,
        date: date
      };
      
      // console.log(result)
      db.Post.create(result).then( function(dbPost) {
        res.send("scrape complete");
      }).catch( function(err) {
        res.json(err);
      });
    });
  });
});