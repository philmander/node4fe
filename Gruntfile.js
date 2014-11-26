var react = require('grunt-react');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [ 'dist/**/*' ],
        jshint: {
            files: ['lib/**/*.js'],
            jshintrc: './.jshintrc'
        },
        jasmine_node: {
            specNameMatcher: "-spec",
            specFolders: ["spec"],
            forceExit: true
        },
        libsass: {
            options: {
                loadPath: ['./styles']
            },
            files: {
                expand: true,
                cwd: 'styles',
                src: ['**/calc.scss'],
                dest: 'styles',
                ext: '.css'
            }
        },
        browserify: {
            main: {
                src: ['./lib/index.js'],
                dest: './dist/calc.js',
                options: {
                    standalone: ['calc'],
                    transform:  [ react.browserify ]
                }
            },
            watch: {
                src: ['./lib/index.js'],
                dest: './dist/calc.js',
                options: {
                    watch: true,
                    keepAlive: true,
                    standalone: ['calc'],
                    transform:  [ react.browserify ]
                }
            }
        },
        watch: {
            sass: {
                files: ['styles/**/*.js'],
                tasks: ['libsass'],
                options: {
                    spawn: false
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            watchall: ['watch:sass', 'browserify:watch']
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-libsass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['clean', 'jshint', 'jasmine_node', 'libsass', 'browserify']);
    grunt.registerTask('watchall', ['concurrent']);

};