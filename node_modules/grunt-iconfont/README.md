# grunt-iconfont

[![Build Status](https://travis-ci.org/poppinlp/grunt-iconfont.png?branch=master)](https://travis-ci.org/poppinlp/grunt-iconfont)
[![Dependency Status](https://david-dm.org/poppinlp/grunt-iconfont.svg)](https://david-dm.org/poppinlp/grunt-iconfont)
[![devDependency Status](https://david-dm.org/poppinlp/grunt-iconfont/dev-status.svg)](https://david-dm.org/poppinlp/grunt-iconfont#info=devDependencies)

Create icon fonts from several SVG icons.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-iconfont --save
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-iconfont');
```

## Iconfont Task

_Run this task with the `grunt iconfont` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### src

Type: `string`

SVG glyphs. Wildcards are supported.

#### dest

Type: `string`

Directory of the resulting font.

#### options.fontName

Type: `String`

Default value: `'iconfont'`

A string value that is used to name your font-family.

#### options.*

And support all options that `grunt-svgicons2svgfont` support. You could read [this page](https://github.com/poppinlp/grunt-svgicons2svgfont#user-content-options) for detail.

### Example

```js
grunt.initConfig({
  iconfont: {
    options: {
      fontName: "my-font-name"
    },
    your_target: {
        src: 'glyphs/*.svg',
        dest: 'font/'
    }
  },
})
```

### Contributing / Issues

You may want to contribute to this project, pull requests are welcome if you accept to publish under the MIT licence.
