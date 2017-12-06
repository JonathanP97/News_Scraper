var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');

var PORT = 3000;
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/thing", {
  useMongoClient: true
});



app.listen(PORT, function() {
	console.log("Running on port: " + PORT);
});