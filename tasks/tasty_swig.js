/*
 * grunt-tasty-swig
 * https://github.com/narma/grunt-tasty-swig
 *
 * Copyright (c) 2013 Sergey Rublev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var fs = require('fs'),
    swig = require('swig'),
    path = require('path'),
    _ = grunt.util._;

  grunt.registerMultiTask('tasty_swig', 'Process templates by swig', function(ctx) {
    var data = this.data;

    var options = this.options({
      extendSwig: null,
      extension: '.swig',
      data: '',
      context: {},
      nonull: false,
      datanonull: false
    });
    var config = _.merge(_.clone(options, true), data);
    
    var tswig = new swig.Swig({locals: config.context});

    // we must call both func if passed
    if (_.isFunction(options.extendSwig)) {
      options.extendSwig(tswig);
    }
    if (_.isFunction(data.extendSwig)) {
      data.extendSwig(tswig);
    } 

    this.filesSrc.forEach(function(filepath) {
      grunt.log.debug("Process ", filepath);
      if (!grunt.file.exists(filepath)) {
        if (config.nonull) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
        }
        return;
      }
      var tpl = tswig.compileFile(path.resolve(filepath));

      var file = path.basename(filepath, config.extension);

      var tplVars = {};
    
      try {
        var f = path.resolve(config.data, file + ".json");
        if (grunt.file.exists(f)) {
          tplVars = grunt.file.readJSON(f);
        } else if (options.datanonull) {
          grunt.log.warn("Json filename ", f, "not found");
        }
        
      } catch(err) {
        grunt.log.warn("Can't read json file", f, err);
      }

      var src = tpl(tplVars);

      // Write the destination file.
      var destFp = path.resolve(data.dest, file + ".html");
      grunt.file.write(destFp, src);
      grunt.log.writeln('File "' + destFp + '" created.');
    });
  });
};
