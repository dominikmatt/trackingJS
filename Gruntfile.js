'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
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
    });
   
    grunt.registerTask('default', ['jshint']);
};