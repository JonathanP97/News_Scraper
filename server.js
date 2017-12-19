///////////////////////////////////////////////////////////////////////////////
//Setup
var express = require('express');
var expHnd = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');  
var axios = require('axios');

var PORT = 3000;
var app = express();
var db = require("./models");

app.engine("handlebars", expHnd({defaultLayout: "main"}) );
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise; 
mongoose.connect("mongodb://localhost/news_scraper", {
  useMongoClient: true
});

////////////////////////////////////////////////////////////////////////////////
//Routes
app.get("/home", function(req, res) {
	db.Post.find({sub: "worldnews"}).then(function(post) {
		res.render("index", post);
	}).catch(function(err) {
		res.json(err);
		console.log(err);
	});
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

//Find posts by subreddit
app.get("/posts/:sub", function(req, res) {
	db.Post.find({sub: req.params.sub}).then(function(posts) {
		res.json(posts);
	}).catch(function(err) {
		res.json(err);
	});
});

app.get("/sub", function(req, res) {
	db.Sub.find({}).then(subs => {
		res.json(subs);
	}).catch(err =>{
		res.json(err);
	})
});

app.listen(PORT, function() {
	console.log("Running on port: " + PORT);
});

//Scraper route/////////////////////////////
app.get("/scrape/:sub", function(req, res) {
  axios.get("https://www.reddit.com/r/" + req.params.sub).then(function(response) { 
    var $ = cheerio.load(response.data);

    var results = [];

    $("div.top-matter").each(function(i, element) {
      var title = $(element).children("p.title").text();
      var link = $(element).children("p.title").children("a").attr("href");
      var author = $(element).children("p.tagline").children("a").text();
      var date = $(element).children("p.tagline").children("time").attr("title");

      var result = {
        title: title,
        link: link,
        author: author,
        date: date,
        sub: req.params.sub
      };

      results.push(result);
    });

    //Adds scraped subreddit to db, if not there already
	db.Sub.find({name: results[0].sub}).then(sub => {
		if (sub && sub.length) {
			console.log("found", sub.name);
		} else {
			console.log("no match, adding subreddit");
			db.Sub.create({
				name: results[0].sub, 
				link: "reddit.com/r/" + results[0].sub
			}).then(()=> {
				res.send('sub added');
			}).catch(err => res.json(err));
		}
	});


    //Checks array of posts for repeats within db
    results.forEach(result => {
    	db.Post.find({title: result.title}).then(post => {
    		if (post && post.length) {
    			console.log("found in database", post[0].title);
    		} else {
    			console.log("no match found, adding to db");
				db.Post.create(result).then(dbPost => {
			    	res.send('scrape complete');
			    }).catch(err => res.json(err));
    		}
    	});
    })
    res.send('scrape done');

  });
});