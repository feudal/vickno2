const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');

function includetohtml() {
  return src('docs/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('docs/'))
    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'docs/'
    }
  });
}

function images() {
  return src('docs/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('docs/img'))
}

function cleanDist() {
  return del('docs');
}

// 'node_modules/jquery/dist/jquery.js',
// 'node_modules/@fancydocss/fancybox/dist/jquery.fancybox.js',
// 'node_modules/mixitup/dist/mixitup.js',
// 'docs/js/main.js'
// 'node_modules/slick-carousel/slick/slick.js',
// 'node_modules/pikaday/pikaday.js',

function scripts() {
  return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'docs/js/main.js'
    ])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('docs/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('docs/scss/style.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('docs/css'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
      'docs/css/*.css',
      'docs/fonts/**/*',
      'docs/js/*.js',
      'docs/*.html'
    ], { base: 'docs' })
    .pipe(dest('docs'))
}

function watching() {
  watch(['docs/scss/**/*.scss'], styles);
  watch(['docs/js/**/*.js', '!docs/js/main.min.js'], scripts);
  watch(['docs/html/**/*.html']).on('change', browserSync.reload);
  watch(['docs/html/**/*.html'], includetohtml);
}

exports.images = images;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.includetohtml = includetohtml;
exports.build = build;

exports.my_build = series(cleanDist, images, build);
exports.default = parallel(includetohtml, styles, scripts, browsersync, watching);