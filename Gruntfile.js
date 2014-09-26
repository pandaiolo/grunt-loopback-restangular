/*
 * grunt-loopback-restangular
 * https://github.com/pandaiolo/grunt-loopback-restangular.git
 *
 * Copyright (c) 22014 StrongLoop, Inc. & Aurélien Chivot
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  //noinspection JSHint
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    loopback_restangular: {
      options: {
        clientModelConfig: 'test/fixtures/config.js',
        input: 'test/fixtures/app.js'
      },
      default_options: {
        options: {
          output: 'tmp/default_options'
        }
      },
      custom_options: {
        options: {
          output: 'tmp/custom_options',
          ngModuleName: 'customServices',
          apiUrl: 'http://custom/api/'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'loopback_restangular', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
