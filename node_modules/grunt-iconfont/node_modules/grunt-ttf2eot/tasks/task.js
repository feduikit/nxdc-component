/*
 * grunt-ttf2eot
 * https://github.com/nfroidure/grunt-ttf2eot
 *
 * Copyright (c) 2013 Nicolas Froidure
 * Licensed under the MIT license.
 */

'use strict';

var Path = require('path')
  , Package = require('../package.json')
  , ttf2eot = require('ttf2eot');

module.exports = function(grunt) {

  grunt.registerMultiTask('ttf2eot', Package.description, function() {
    this.requiresConfig([this.name, this.target, 'src'].join('.'));
    this.requiresConfig([this.name, this.target, 'dest'].join('.'));

    var done = this.async();

    this.files.forEach(function (files) {


      files.src.forEach(function(srcFile) {

        var ext = Path.extname(srcFile)
          , fontName = Path.basename(srcFile, ext)
          , destFile = Path.join(files.dest, fontName) + '.eot';

        if('.ttf' !== ext) {
          grunt.log.fail('The given file seems to not be a TTF font ('
            + srcFile + ')');
        }

        try {

          grunt.file.write(destFile,
            new Buffer(ttf2eot(
              new Uint8Array(grunt.file.read(srcFile, {
                encoding: null
              }))
            ).buffer)
          );

          grunt.log.ok('Created "' + destFile + '" from "' + srcFile + '"');
          done();

        } catch(e) {

          grunt.log.fail('Unable to create "' + destFile + '" from "' + srcFile
            + '" (error: ' + e.message + ')');
          done();

        }

      });

    });

  });

};

