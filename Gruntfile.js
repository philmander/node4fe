module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [ 'path/to/dir/one' ],
        jshint: {
            files: ['lib/**/*.js'],
            jshintrc: './.jshintrc'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jshint']);

};