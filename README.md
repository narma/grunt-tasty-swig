# grunt-tasty-swig

> Grunt preprocess and templating plugin using swig

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tasty-swig --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tasty-swig');
```

## The "tasty_swig" task

### Overview
In your project's Gruntfile, add a section named `tasty_swig` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tasty_swig: {
    options: {
      data: 'build/data',
      context: {
        'hello': 'Alloha'
      }
    },
    index: {
      context: {
          'word': 'World'
      },
      src: ['templates/**.swig'],
      dest: 'build/templates'
    }
  },
})
```

### Options

#### options.context
Type: `Object`
Default value: `{}`

Global template variables for swig

#### options.data
Type: `String`
Default value: `''`

A string value that is used to do find .json files with template variables.

#### options.extension
Type: `String`
Default value: `.swig`

A filename extension for templates

#### options.extendSwig
Type: `function`
Default value: `null`
Parameters: `swig`

A callback function for extend swig template engine.

For example:
```js
function(swig) {
  function replaceMs(input) { return input.replace(/m/g, 'f'); }
  swig.setFilter('replaceMs', replaceMs);
}
// => {{ "onomatopoeia"|replaceMs }}
// => onofatopeia
```

More on http://paularmstrong.github.io/swig/docs/api/


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial
