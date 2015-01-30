/**
 * Created by ricardov on 1/27/2015.
 */

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-selenium-webdriver');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.initConfig({
        protractor: {
            run: {
                options: {
                    keepAlive: true,
                    configFile: "protractor.conf.js"
                }
            },
            run_firefox: {
                options: {
                    keepAlive: true,
                    configFile: "protractor.firefox.conf.js"
                }
            }
        },
        selenium_start: {
            options: {port: 4445}
        },
        watch: {
            server: {
                files: [
                    'server/*',
                    'server/**/*',
                    'specs/*.spec.js'
                ],
                tasks: ['protractor:run']
            }
        }
    });

    grunt.registerTask('server', 'Start a custom web server', function () {
        require('./server.js').listen(44544);
    });

    grunt.registerTask('test_firefox', ['selenium_start', 'protractor:run_firefox']);
    grunt.registerTask('test', ['selenium_phantom_hub', 'protractor:run']);

    grunt.registerTask('run', ['server', 'test', 'watch']);
}
