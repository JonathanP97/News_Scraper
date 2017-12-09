var cheerio = require('cheerio');
var request = require('request');
var axios = require("axios");
var db = require("./models");

// scrape();

function scrape() {
  axios.get("https://www.npr.org").then(function(response) {
    var $ = cheerio.load(response.data);

    $("article div.story-text").each( function(i, element) {
      if(element === 0) console.log( $(element) );
    });


    // $("div.top-matter").each(function(element) {
    //   var title = $(element).children("p.title").text();
    //   var link = $(element).children("p.title").children("a").attr("href");
    //   var author = $(element).children("p.tagline").children("a").text();
    //   var date = $(element).children("p.tagline").children("time").attr("title");

      // var result = {
      //   title: title,
      //   link: link,
      //   author: author,
      //   date: date
      // };
      
      // console.log(result);
      // db.Post.create(result).then( function(dbPost) {
      //   console.log("scrape complete");
      // }).catch( function(err) {
      //   console.log(err);
      // })
    // });
    
  });
};

// otherScrape();
function otherScrape() {
  axios.get("https://www.reddit.com/r/hiphopheads").then( function(response) {
    var $ = cheerio.load(response.data);

    var result = [];
    $("p.title").each(function(element) {
      var title = $(element).children("a").text();
      result.push(title);
    });
    console.log(result);
  });
};