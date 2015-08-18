/**
 * Created by ricardov on 1/27/2015.
 */

exports.config = {
    seleniumAddress: 'http://localhost:4445/wd/hub',
    capabilities: {
        'browserName': 'firefox'
    },
    specs: ['specs/*.spec.js'],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    onPrepare: function() {
        require('jasmine-given');

        browser.driver.manage().window().maximize();

        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
    }
};
