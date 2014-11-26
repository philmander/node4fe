var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var vinylStream = require('vinyl-source-stream');
var del = require('del');
var alert = require('./gulp/gulp-alert');
var stream = require('stream');

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


gulp.task('stream-test', function () {

    //create a text stream
    var str = new stream.Readable();
    str.push('hello world');
    str.push(null);

    //convert stream to vinyl
    str.pipe(vinylStream('testy.txt'))

    //send to file
    .pipe(gulp.dest('./dist'));
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
    .pipe(vinylStream('calc.js'))
    .pipe(alert('Welcome to the calculator!'))
    .pipe(gulp.dest('./dist'));
});

//start watching for changes
gulp.task('watch', function() {
    var bundler = watchify(browserify({
        entries: './lib/index.js',
        standalone: "calc"
    }), watchify.args);

    //uncomment to use react as a browser dependency
    //bundler.ignore('react');
    bundler.transform(reactify);

    bundler.on('update', rebundle);

    gulp.watch('./styles/*.scss', ['sass']);

    function rebundle() {

        return bundler.bundle()
            .pipe(vinylStream('calc.js'))
            .pipe(alert('Welcome to the calculator! (built by watch)'))
            .pipe(gulp.dest('./dist'));
    }

    return rebundle();
});

gulp.task('default', ['package']);