[![NPM](https://nodei.co/npm/beloader-animations.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/beloader-animations)

[![GitHub release](https://img.shields.io/github/release/beloader/beloader-animations.svg)](https://github.com/beloader/beloader-animations)
[![Gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/beloader-animations@latest?compression=gzip&style=flat-square)](https://cdn.jsdelivr.net/npm/beloader-animations@latest)
[![Build Status](https://travis-ci.org/beloader/beloader-animations.svg?branch=master)](https://travis-ci.org/beloader/beloader-animations)
[![Coverage Status](https://coveralls.io/repos/github/beloader/beloader-animations/badge.svg?branch=master)](https://coveralls.io/github/beloader/beloader-animations?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Documentation](https://beloader.github.io/beloader-animations//badge.svg)](https://beloader.github.io/beloader-animations/)

[![bitHound Overall Score](https://www.bithound.io/github/beloader/beloader-animations/badges/score.svg)](https://www.bithound.io/github/beloader/beloader-animations)
[![bitHound Code](https://www.bithound.io/github/beloader/beloader-animations/badges/code.svg)](https://www.bithound.io/github/beloader/beloader-animations)
[![bitHound Dependencies](https://www.bithound.io/github/beloader/beloader-animations/badges/dependencies.svg)](https://www.bithound.io/github/beloader/beloader-animations/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/beloader/beloader-animations/badges/devDependencies.svg)](https://www.bithound.io/github/beloader/beloader-animations/master/dependencies/npm)
[![Known Vulnerabilities](https://snyk.io/test/github/beloader/beloader-animations/badge.svg?targetFile=package.json)](https://snyk.io/test/github/beloader/beloader-animations?targetFile=package.json)

<p align="center"><a href="https://liqueurdetoile.com" target="\_blank"><img src="https://hosting.liqueurdetoile.com/logo_lqdt.png" alt="Liqueur de Toile"></a></p>

# beloader-animations
Beloader animations is a plugin for Beloader.

It loads [Elementify](https://github.com/liqueurdetoile/elementify) for lightweight easy DOM
mangagement and bundles the great
[anime.js](https://github.com/juliangarnier/anime) from Julian Garnier to support
animations.

It also provides some presets for displaying animated blocks, anime background colors... that may grow other time.

## Installation

### In browser
For usage in browser, no installation is required. Simply load plugin with [Beloader](https://beloader.github.io/beloader/manual/plugins.html).

That example will load Beloader from CDN, then load plugin and font and finally display animated block and loading message without FOUT effect.

```html
<html>
<head>
  <title>Animation Beloader plugin Example</title>
</head>
<body style="background-color:#000">
  <style>
    .loading {
      font-family: 'Droid Sans';
      font-size: 2em;
      text-align: center;
      color: #fff;
      font-weight: bold;
      margin-top: 2em;
      text-transform: uppercase
    }
  </style>

  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/beloader@1.5.1"></script>

  <script type="text/javascript">
    var loader = new Beloader({
      defer: true
    });

    loader.fetch('plugin', {
      id: 'animations',
      name: 'animations',      
      url: 'https://cdn.jsdelivr.net/npm/beloader-animations@latest'
    }).promise.then(function() {
      elementify.load();
      loader.animations.load('BackgroundColor', function(BackgroundColor) {
        new BackgroundColor({
          targets: 'body',
          from: '#000',
          to: '#09c'
        }).start();
      });

      loader.animations.load('ThreeDotsBouncing').then(function(ThreeDotsBouncing) {
        var dots = new ThreeDotsBouncing();

        Q('body').style('backgroundColor', '#000');
        Q('body').append(dots.block);
        dots.block.width = '30%';
        dots.start();
      })
    });

    loader.fetch('font', {
      webfont: {
        google: {
          families: ['Droid Sans', 'Droid Serif']
        }
      }
    }).promise.then(function(item) {
      elementify.Q('body').prepend('<div class="loading">Loading in progress</div>');
    });
  </script>
</body>
```

See a demo of this example : [https://cdn.rawgit.com/beloader/beloader-animations/94619414/demos/example.html](https://cdn.rawgit.com/beloader/beloader-animations/94619414/demos/example.html)

### As module
As Beloader, beloader-animations is available as UMD to be embedded in wider app. Though, main beloader-animations is pretty useless as a module, each animation can be embedded separately :
```javascript
import 'ThreeDotsBouncing' from 'beloader-animations/dist/animations/ThreeDotsBouncing';
//or
const ThreeDotsBouncing = require('beloader-animations/dist/animations/ThreeDotsBouncing').default;
```
Each animation expect Elementify and Anime to be already loaded as externals.

## Preset animations
See [documentation](https://beloader.github.io/beloader-animations/) for details.
