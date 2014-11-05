requirejs.config({
    paths: {
        "jasmine": "../src/bower_components/jasmine/lib/jasmine-core/jasmine",
        "jasmine-html": "../src/bower_components/jasmine/lib/jasmine-core/jasmine-html",
        "console-runner": "../node_modules/phantom-jasmine/lib/console-runner"
    },
    shim: {
        "jasmine-html": {
            deps: ["jasmine"],
            exports: "jasmine"
        }
    }
});

define("TestRunner", function() {
    require([
        "jquery",
        "jasmine-html"
    ], function($, jasmine) {
        require([
            "console-runner",
            "specs/pattern"
        ], function() {
            var jasmineEnv = jasmine.getEnv();
            var reporter;
            if (/PhantomJS/.test(navigator.userAgent)) {
                reporter = new jasmine.ConsoleReporter();
                window.console_reporter = reporter;
                jasmineEnv.addReporter(reporter);
                jasmineEnv.updateInterval = 0;
            } else {
                reporter = new jasmine.HtmlReporter();
                jasmineEnv.addReporter(reporter);
                jasmineEnv.specFilter = function(spec) {
                    return reporter.specFilter(spec);
                };
                jasmineEnv.updateInterval = 0; // Make this more to see what's happening
            }
            jasmineEnv.execute();
        });
    });
});
require(["TestRunner"]);
