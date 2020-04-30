const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

// Compile SASS to CSS
const style = () => {
    return gulp.src('./styles/scss/**/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./styles/css'))
        .pipe(browserSync.stream())
}

// BrowserSync => Live Server für HTML, SASS und JS
const watch = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./styles/scss/**/*.scss', style)
    gulp.watch('./**/*.html').on('change', browserSync.reload)
    gulp.watch('./js/**/*.js').on('change', browserSync.reload)
}

exports.style = style
exports.watch = watch