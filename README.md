# Resume

Coded using CodePen's online project editor. 

Written with Pug and Stylus. Used Babel to handle js conversions.

# Features
 * Static single page application
 * Requires JS to run major animations
 * Fallbacks gracefully when no JS is present

# Usage

### Before starting:
* Resume requires Pug, Stylus and Webpack .
* Pug, Stylus and Webpack (like pretty much any other thing nowadays) require npm
* npm requires NodeJS...

You get the picture. So read the rest and then go grab what you need.

- Pug (https://github.com/pugjs/pug)
- Stylus (https://github.com/stylus/stylus/)
- Webpack (https://github.com/webpack/webpack)

I know this might be troublesome but the whole idea is to get some hands-on practice with these tools.

### Moving on

1. Clone or download this repository
1. Edit contents @views/content/
1. (optional) Change nav titles @views/layouts/_nav.pug
1. (optional) Add individual backgrounds @views/_backgrounds.pug
1. (optional) Change/Add background colors @resources/styles/content/components/_backgrounds.styl
1. (optional) Use webpack to process @resources/scripts/app.js, if you decided to change anything in there
1. (optional) Use stylus to process @resources/styles/app.styl, if you decided to change any of the styles
1. Use pug on @index.pug to get a new @index.html compiled
1. Use whatever server you like to serve the repository
 
 Aaand... there it is. Your very own resume project fresh out of the oven.
 You could alternatively just modify the contents of the index.html file provided but where's the fun in that?
 To modify the js
 

# Notes
 * Uses jQuery. It's required from CDN. Could have done it without it but I got lazy
 * Velocity.js (http://velocityjs.org/) is included within the source files

Look me up at CodePen https://codepen.io/ozwild/ 
