const {src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber')

//Imagenes
const webp = require('gulp-webp');

function css(done) {
  src('src/scss/**/*.scss')//identificar archivo de sass
  .pipe(plumber())
  .pipe(sass())//compilarlo
  .pipe(dest("build/css"));//guardarla e el disco duro

  done();//call back que acisa qe llegmos al final de la ejecucion
}

function versionWebp (done) {

  const opciones = {
    quality:50
  };

  src('src/img/**/*.{png,jpg}')
  .pipe( webp())
  .pipe( dest('build/img'));
}
function dev(done) {
  watch('src/scss/**/*.scss', css)

  done();
}


exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel (versionWebp, dev);
