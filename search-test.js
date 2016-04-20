/* jslint node: true */
/* global before, afterEach, after, featureFile, scenarios, steps */
"use strict";

var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

// stepdef file loader
var library = [];
var path = require('path');
var fs = require('fs');
var stepfolder = path.join('test', 'stepdefs');
fs.readdirSync(stepfolder).forEach(function (file) {
    // trying to work on all platforms, there is probably a better way
    library.push(require('./test/stepdefs/' + file));
});

var webdriver = require('selenium-webdriver');
var driver;

new Yadda.FeatureFileSearch('./test/features').each(function (file) {
    featureFile(file, function (feature) {
        console.log(file);
        console.log(feature.annotations);
        before(function (done) {
            executeInFlow(function () {
                if (feature.annotations.webdriver) {
                    driver = require('./lib/webdriver-util')
                }
            }, done);
        });

        scenarios(feature.scenarios, function (scenario) {
            steps(scenario.steps, function (step, done) {
                executeInFlow(function () {
                    Yadda.createInstance(library, { driver: driver }).run(step);
                }, done);
            });
        });

        afterEach(function () {
            takeScreenshotOnFailure(this.currentTest);
        });

        after(function (done) {
            executeInFlow(function () {
                if (feature.annotations.webdriver) {
                    driver = new webdriver.Builder().forBrowser('firefox').build();
                    driver.manage().timeouts().implicitlyWait(10000);
                }
            }, done);
        });
    });
});

function executeInFlow(fn, done) {
    webdriver.promise.controlFlow().execute(fn).then(function () {
        done();
    }, done);
}

function takeScreenshotOnFailure(test) {
    if (test.state != 'passed') {
        var path = 'screenshots/' + test.title.replace(/\W+/g, '_').toLowerCase() + '.png';
        driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(path, data, 'base64');
        });
    }
}