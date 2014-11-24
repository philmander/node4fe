var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');
var alert = require('./gulp/gulp-alert');

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

gulp.task('sass', function () {
    gulp.src('./styles/calc.scss')
        .pipe(sass())
        .pipe(gulp.dest('./styles'));
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
    //bundler.ignore('react');
    .transform(reactify)
    .bundle()
    .pipe(source('calc.js'))
    .pipe(alert('Welcome to the calculator!'))
    .pipe(gulp.dest('./dist'));
});

//start watching for changes
gulp.task('watch', function() {
    var bundler = watchify(browserify({
        entries: './lib/index.js',
        standalone: "calc"
    }), watchify.args);

    //bundler.ignore('react');
    bundler.transform(reactify);

    bundler.on('update', rebundle);

    function rebundle() {
        gulp.watch('./styles/*.scss', ['sass']);
        return bundler.bundle()
            .pipe(source('calc.js'))
            .pipe(alert('Welcome to the calculator! (built by watch)'))
            .pipe(gulp.dest('./dist'));
    }

    return rebundle();
});

gulp.task('default', ['package']);