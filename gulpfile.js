const {src, dest, watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber')

function css(done) {
  src('src/scss/**/*.scss')//identificar archivo de sass
  .pipe(plumber())
  .pipe(sass())//compilarlo
  .pipe(dest("build/css"));//guardarla e el disco duro

  done();//call back que acisa qe llegmos al final de la ejecucion
}
function dev(done) {
  watch('src/scss/**/*.scss', css)

  done();
}

exports.css = css;
exports.dev = dev;
