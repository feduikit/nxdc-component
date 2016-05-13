# grunt-svg2ttf

Grunt task to create a TTF font from an SVG font.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
 the [Getting Started](http://gruntjs.com/getting-started) guide, as it
 explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as
 well as install and use Grunt plugins. Once you're familiar with that process,
 you may install this plugin with this command:

```shell
npm install grunt-svg2ttf --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
 with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg2ttf');
```

## The "svg2ttf" task

### Overview
In your project's Gruntfile, add a section named `svg2ttf` to the data
 object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  svg2ttf: {
    your_target: {
      // Target-specific file lists go here.
    }
  }
})
```

### Options

#### src
Type: `string`

SVG fonts to convert. Wildcards are supported.

#### dest
Type: `string`

Directory in wich to save the converted font.

### Example

```js
grunt.initConfig({
  svg2ttf: {
    svg2ttf: {
      src: 'fonts/*.svg',
      dest: 'fonts/'
    }
  }
})
```

### Contributing / Issues

Please submit SVG to TTF related issues to the
 [svg2ttf project](https://github.com/fontello/svg2ttf)
 on wich grunt-svg2ttf is built.

This repository issues is only for grunt and grunt tasks related issues.

You may want to contribute to this project, pull requests are welcome if you
 accept to publish under the MIT licence.
