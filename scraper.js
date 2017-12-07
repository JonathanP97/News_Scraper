var cheerio = require('cheerio');
var request = require('request');

scrape();

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
};