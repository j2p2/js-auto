var webdriver = require('selenium-webdriver');

module.exports = function () {
    driver = new webdriver.Builder().forBrowser('firefox').build();
    driver.manage().timeouts().implicitlyWait(10000);
}