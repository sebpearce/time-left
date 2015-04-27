module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/base.js',  // my library
                    'js/global.js',  // main JS
                ],
                dest: 'js/build/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/global.css': 'css/global.scss'
                }
            } 
        },

        watch: {
           options: {
                livereload: true,
           },
           scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};