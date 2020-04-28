const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const { src, series, dest } = require('gulp')

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

// Copy HTML to dist folder
const copyHTML = () => {
    return src('./html/*.html')
        .pipe(gulp.dest('dist'))
}

// Minify images
const imageMinify = () => {
    return src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

// Minify js files
const jsMinify = () => {
    return src('./js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist'))
}

// Minify css files
const cssMinify = () => {
    return src('./styles/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist'))
}

exports.style = style
exports.watch = watch
exports.copyHTML = copyHTML
exports.imageMinify = imageMinify
exports.jsMinify = jsMinify
exports.cssMinify = cssMinify
exports.build = series(style, copyHTML, imageMinify, jsMinify, cssMinify)