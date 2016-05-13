'use strict';

module.exports = function(grunt) {
    grunt.config.init({
        iconfont: {
            dist: {
                options: {
                    fontName: 'font1'
                },
                src: 'tests/icons1/*.svg',
                dest: 'tests/font/'
            },
            test: {
                src: 'tests/icons2/*.svg',
                dest: 'tests/font/'
            }
        }
    });

    grunt.loadTasks('tasks/');

    grunt.registerTask('test', ['iconfont']);
};
