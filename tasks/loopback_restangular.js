/*
 * grunt-loopback-restangular
 * https://github.com/pandaiolo/grunt-loopback-restangular
 *
 * Copyright (c) 2014 StrongLoop, Inc.
 * Copyright (c) 2014 Aurélien Chivot
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var generator = require('loopback-restangular');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask(
    'loopback_restangular',
    'Grunt plugin auto-generating Restangular services for Angular & LoopBack',
    runTask);

  function runTask() {
    /*jshint validthis:true */

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      appFile: 'server/server.js',
      clientModelConfig: 'client/model-config.json',
      ngModuleName: 'lbServices',
      apiUrl: undefined
    });

    var appFile = options.input;

    if (!grunt.file.exists(options.clientModelConfig)) {
      grunt.fail.warn('Client model config file ' +
                      options.clientModelConfig + ' not found.');
    }

    if (!grunt.file.exists(appFile))
      grunt.fail.warn('Input file ' + appFile + ' not found.');

    if (!options.output)
      grunt.fail.warn('Missing mandatory option "output".');

    var app;
    try {
      app = require(path.resolve(appFile));
      grunt.log.ok('Loaded LoopBack app %j', appFile);
    } catch (e) {
      var err = new Error('Cannot load LoopBack app ' + appFile);
      err.origError = e;
      grunt.fail.warn(err);
    }

    options.apiUrl = options.apiUrl || app.get('restApiRoot') || '/api';

    grunt.log.writeln('Generating %j for the API endpoint %j',
      options.ngModuleName,
      options.apiUrl);

    // grunt.log.writeln('Path normal %j', options.clientModelConfig);
    // grunt.log.writeln('Path resolved %j', path.resolve(options.clientModelConfig));

    var script = generator.services({
      app: app,
      clientModelConfig: path.resolve(options.clientModelConfig),
      ngModuleName: options.ngModuleName,
      apiUrl: options.apiUrl
    });

    grunt.file.write(options.output, script);

    grunt.log.ok('Generated Angular services file %j', options.output);
  }
};
