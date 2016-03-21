var assert = require('assert');
var English = require('yadda').localisation.English;
var Wall = require('../../lib/search'); // The library that you wish to test
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

module.exports = (function() {
  return English.library()
  
    .given("$NUM green bottles are standing on the wall", function(number, next) {
       wall = new Wall(number);
       next();
    })
	
    .when("$NUM green bottle accidentally falls", function(number, next) {
		wall.fall(number);
		next();
    })
	
    .then("there are $NUM green bottles standing on the wall", function(number, next) {
       assert.equal(number, wall.bottles);
       next();
    })
	
	.given("I submit a search query '$query'", function(query, next) {
		driver.get('http://www.google.com/');
		driver.findElement(By.name('q')).sendKeys('webdriver');
		driver.findElement(By.name('btnG')).click();
		driver.wait(until.titleIs('webdriver - Google Search'), 1000);
		driver.quit();
		next();
	})
	
	.then("I should reach the search results page", function(next) {
		next();
	});
})();