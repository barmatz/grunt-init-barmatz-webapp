/*global module:true*/
module.exports = function (grunt) {
    'use strict';
    
    var banner = '/*! <%= pkg.title %> v<%= pkg.version %> */\n',
    footer = '\n/*! generated <%= grunt.template.today("yyyy-mm-dd h:mm:ss TT") %> */';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: 'dist/js',
            jsdoc: 'jsdoc',
            css: 'dist/css'
        },
        compass: {
            options: {
                cssDir: 'dist/css',
                sassDir: 'src/css',
                specify: 'src/css/style.scss',
                imagesDir: 'dist/css/images',
                javascriptDir: 'dist/js',
                fontsDir: 'dist/css/fonts',
                relativeAssets: true,
                outputStyle: 'expanded'
            },
            dev: {
                options: {
                    environment: 'development'
                }
            },
            dist: {
                options: {
                    environment: 'production'
                }
            }
        },
        concat: {
            options: {
                banner: banner,
                footer: footer,
                separator: '<%= grunt.util.linefeed %><%= grunt.util.linefeed %>'
            },
            dist: {
                files: {
                    'dist/js/script.js': 'src/**/*.js'
                }
            }
        },
        copy: {
            src: {
                expand: true,
                cwd: 'src/',
                src: ['**', '!**/*.{js,css,scss}'],
                dest: 'dist/'
            },
            vendor: {
                expand: true,
                cwd: 'vendor',
                src: '**',
                dest: 'dist/vendor/'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: ['src/**/*.css']
        },
        cssmin: {
            options: {
                banner: banner
            },
            src: {
                files: {
                    'dist/css/style.min.css': 'dist/css/style.css'
                }
            }
        },
        connect: {
            server: {}
        },
        jasmine: {
            options: {
                specs: 'test/**/{spec,*Spec}.js',
                vendor: 'vendor/**/*.js',
                host: 'http://127.0.0.1:8000'
            },
            src: {
                src: 'src/**/*.js'
            },
            dist: {
                src: 'dist/**/*.js'
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            grunt: ['package.json', 'Gruntfile.js'],
            src: 'src/**/*.js',
            dist: {
                options: {
                    devel: false
                },
                src: 'dist/**/*.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                banner: banner,
                footer: footer
            },
            src: {
                files: {
                    'dist/js/script.min.js': 'dist/js/script.js'
                }
            }
        },
        watch: {
            options: {
                atBegin: true
            },
            grunt: {
                files: ['package.json', 'Gruntfile.js'],
                tasks: ['default']
            },
            css: {
                files: ['.csslintrc', 'src/**/*.scss'],
                tasks: ['buildCSS']
            },
            js: {
                files: ['.jshintrc', 'src/**/*.js'],
                tasks: ['buildJS']
            },
            html: {
                files: 'src/**/*.html',
                tasks: ['htmllint', 'copy']
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.title || pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    linkNatives: true,
                    paths: 'src/js/',
                    outdir: 'jsdoc'
                }
            }
        },
        htmllint: {
            src: 'src/**/*.html'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html');

    grunt.registerTask('default', ['buildJS', 'buildCSS', 'htmllint', 'copy']);
    grunt.registerTask('buildJS', ['jshint:grunt', 'jshint:src', 'jasmine:src', 'clean:js', 'concat', 'jshint:dist', 'jasmine:dist', 'uglify', 'jasmine:dist', 'clean:jsdoc', 'yuidoc']);
    grunt.registerTask('buildCSS', ['clean:css', 'compass:dev', 'csslint', 'cssmin']);
};