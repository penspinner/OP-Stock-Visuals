var gulp = require('gulp'),
    gulp_sass = require('gulp-sass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

var outputDir = 'app/',
    process = 'process/',
    app = process + 'app.js',
    jsDir = process + 'js/',
    sassDir = process + 'sass/';

/* Compiles the app.js (node starting point) in ES6. */
gulp.task('app', function()
{
    browserify(app)
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(outputDir));
});

/* Compiles all ES6 and React sources. */
gulp.task('js', function()
{
    browserify({
        entries: ['./process/js/StockVisuals.js', ''],
        extensions: ['.js'],
        debug: true
    })
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('brfs')
    .bundle()
    .pipe(source('StockVisuals.js'))
    .pipe(gulp.dest(outputDir + 'public/js'));
});

gulp.task('sass', function()
{
    gulp.src(sassDir + 'style.scss')
        .pipe(gulp_sass({outputStyle: ''}).on('error', gulp_sass.logError))
        .pipe(gulp.dest(outputDir + 'public/css'));
});

gulp.task('watch', function()
{
    // gulp.watch(app, ['app']);
    gulp.watch(jsDir + '*.js', ['js']);
    gulp.watch(sassDir + '*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'watch']);