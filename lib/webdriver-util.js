var webdriver = require('selenium-webdriver');
var internaldriver = new webdriver.Builder().forBrowser('firefox').build()
internaldriver.manage().timeouts().implicitlyWait(10000);


module.exports = internaldriver