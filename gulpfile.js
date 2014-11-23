var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');

gulp.task('clean', function () {
    return del('./dist/**/*.*');
});

//jshint
gulp.task('lint', function() {
    return gulp.src('lib/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

//jasmine
gulp.task('test', [ 'lint' ], function () {
    return gulp.src('./spec/**/*-spec.js')
        .pipe(jasmine());
});

//distribute (uglfiy and concat)
gulp.task('dist', [ 'test', 'clean' ], function () {
    return gulp.src('./spec/**/*-spec.js')
        .pipe(uglify())
        .pipe(concat())
        .pipe(gulp.dest('./dist/calc.min.js'));
});

//package with browserify
gulp.task('package', [ 'test', 'clean' ], function() {
    return browserify({
        entries: './lib/index.js',
        standalone: "calc"
    })
    .transform(reactify)
    .bundle()
    .pipe(source('calc.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['package']);