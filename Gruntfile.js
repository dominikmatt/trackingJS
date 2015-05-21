'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('jshint-stylish');

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [],
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'scripts/**/*.js'
            ]
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: '*'
                }
            }
          }
    });
   
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('serve', ['connect:server:keepalive']);
};