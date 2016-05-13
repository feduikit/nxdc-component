'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('iconfont', 'Create icon fonts from several SVG icons.', function () {
        // register task
        (require('../node_modules/grunt-svgicons2svgfont/tasks/svgicons2svgfont.js'))(grunt);
        (require('../node_modules/grunt-svg2ttf/tasks/task.js'))(grunt);
        (require('../node_modules/grunt-ttf2eot/tasks/task.js'))(grunt);
        (require('../node_modules/grunt-ttf2woff/tasks/task.js'))(grunt);

        // check require
        this.requiresConfig([this.name, this.target, "src"].join("."));
        this.requiresConfig([this.name, this.target, "dest"].join("."));

        var path = require('path'),
            fs = require('fs'),
            targetName = this.target,
            options = this.options({
                fontName: 'iconfont'
            }),
            data = this.data;

        // make config object for tasks
        var config = {
                svgicons2svgfont: {},
                svg2ttf: {},
                ttf2eot: {},
                ttf2woff: {}
            };

        config.svgicons2svgfont[targetName] = {
            options: options,
            src: data.src,
            dest: data.dest
        };
        config.svg2ttf[targetName] = {
            src: path.join(data.dest, options.fontName + '.svg'),
            dest: data.dest
        };
        config.ttf2eot[targetName] = {
            src: path.join(data.dest, options.fontName + '.ttf'),
            dest: data.dest
        };
        config.ttf2woff[targetName] = {
            src: path.join(data.dest, options.fontName + '.ttf'),
            dest: data.dest
        };

        // merge config
        grunt.config.merge(config);

        // run tasks
        grunt.task.run(['svgicons2svgfont:' + targetName]);
        grunt.task.run(['svg2ttf:' + targetName]);
        grunt.task.run(['ttf2eot:' + targetName]);
        grunt.task.run(['ttf2woff:' + targetName]);
    });
};
