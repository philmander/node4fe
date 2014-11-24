var compileSass = require('broccoli-sass');
var pickFiles = require('broccoli-static-compiler');

var styles = 'styles';
styles = pickFiles(styles, {
    srcDir: '/',
    destDir: 'styles'
});

var sourceTrees = [styles];

var appCss = compileSass(sourceTrees, 'styles/calc.scss', 'styles/calc.css');

module.exports = appCss;