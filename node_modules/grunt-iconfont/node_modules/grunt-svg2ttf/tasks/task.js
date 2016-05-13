/*
 * grunt-svg2ttf
 * https://github.com/nfroidure/grunt-svg2ttf
 *
 * Copyright (c) 2013 Nicolas Froidure
 * Licensed under the MIT license.
 */

'use strict';

var Path = require('path')
  , Package = require('../package.json')
  , svg2ttf = require('svg2ttf');

module.exports = function(grunt) {

  grunt.registerMultiTask('svg2ttf', Package.description, function() {
    this.requiresConfig([this.name, this.target, 'src'].join('.'));
    this.requiresConfig([this.name, this.target, 'dest'].join('.'));

    var done = this.async();

    this.files.forEach(function (files) {


      files.src.forEach(function(srcFile) {

        var ext = Path.extname(srcFile)
          , fontName = Path.basename(srcFile, ext)
          , destFile = Path.join(files.dest, fontName) + '.ttf';

        if('.svg' !== ext) {
          grunt.log.fail('The given file seems to not be a SVG file ('
            + srcFile + ')');
        }

        try {

          grunt.file.write(destFile,
            new Buffer(svg2ttf(
              grunt.file.read(srcFile, {
                encoding: 'utf8'
              })
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

