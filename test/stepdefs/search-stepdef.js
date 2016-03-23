var assert = require('assert');
var English = require('yadda').localisation.English;
var Wall = require('../../lib/search'); // The library that you wish to test
var webdriver = require('selenium-webdriver');

module.exports = (function() {
  return English.library()

    .given("$NUM green bottles are standing on the wall", function(number, next) {
      wall = new Wall(number);
    })

    .when("$NUM green bottle accidentally falls", function(number, next) {
		  wall.fall(number);
    })

    .then("there are $NUM green bottles standing on the wall", function(number, next) {
      assert.equal(number, wall.bottles);
    })

	  .given("I submit a search query '$query'", function(query, next) {
		  var driver = this.driver;
		  driver.get('http://www.google.com/');
		  driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
		  driver.findElement(webdriver.By.name('btnG')).click();
	    driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
	  })

	  .then("I should reach the search results page", function(next) {
	  });
})();
