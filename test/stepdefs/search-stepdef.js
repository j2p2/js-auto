require('./new-stepdef')
var English = require('yadda').localisation.English;
var assert = require('assert');
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
})();
