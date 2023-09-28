const {src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
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

  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{png,jpg}')
  .pipe( cache( imagemin(opciones) ) )
  .pipe(dest('build/img'))
  done();
}
function dev(done) {
  watch('src/scss/**/*.scss', css)

  done();
}


exports.css = css;
exports.imagenes = imagenes
exports.versionWebp = versionWebp;
exports.dev = parallel (imagenes, versionWebp, dev);
