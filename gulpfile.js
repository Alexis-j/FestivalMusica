const {src, dest, watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));

function css(done) {
  src('src/scss/app.scss')//identificar archivo de sass
  .pipe(sass())//compilarlo
  .pipe(dest("build/css"));//guardarla e el disco duro

  done();//call back que acisa qe llegmos al final de la ejecucion
}
function dev(done) {
  watch('src/scss/app.scss', css)

  done();
}

exports.css = css;
exports.dev = dev;
