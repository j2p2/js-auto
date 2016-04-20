var assert = require('assert');
var English = require('yadda').localisation.English;
var webdriver = require('selenium-webdriver');

module.exports = (function () {
    return English.library()

        .given("I submit a search query '$query'", function (query, next) {
            var driver = this.driver;
            driver.get('http://www.google.com/');
            driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
            driver.findElement(webdriver.By.name('btnG')).click();
            driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
        })

        .then("I should reach the search results page", function (next) {
        });
})();
