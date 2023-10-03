const {src, dest, watch, parallel, series } = require("gulp");
//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcesmaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


//javascript
const terser =  require('gulp-terser-js');

function css(done) {
  src('src/scss/**/*.scss')//identificar archivo de sass
  .pipe(sourcesmaps.init())
  .pipe(plumber())
  .pipe(sass())//compilarlo
  .pipe( postcss([autoprefixer(), cssnano()]))
  .pipe(sourcesmaps.write('.'))
  .pipe(dest("build/css"));//guardarla e el disco duro

  done();//call back que acisa qe llegmos al final de la ejecucion
}

function versionWebp (done) {
  const opciones = {
    quality:50
  };

  src('src/img/**/*.{png,jpg}')
  .pipe( webp(opciones))
  .pipe( dest('build/img'));

  done();
}

function versionavif (done) {

  const opciones = {
    quality:50
  };

  src('src/img/**/*.{png,jpg}')
  .pipe( avif(opciones))
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

function javascript(done) {
  src('src/js/**/*.js')
    .pipe(sourcesmaps.init())
    .pipe(terser())
    .pipe(sourcesmaps.write('.'))
    .pipe(dest('build/js'));
  done();
}

function dev(done) {
  watch('src/scss/**/*.scss', css)
  watch('src/javascript/**/*.js', javascript)


  done();
}

function build(done) {
  return series(css, imagenes, javascript, function moveFiles() {
    return src(['build/**/*', '!build/img', '!build/img/**/*'])
      .pipe(dest('dist'));
  })(done);
}


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionavif = versionavif;
exports.dev = parallel(imagenes, versionWebp, versionavif, javascript, dev);
exports.build = build;
