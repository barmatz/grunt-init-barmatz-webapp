/*global module:true*/
module.exports = function (grunt) {
    'use strict';
    
    var banner = '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> */\n',
    footer = '\n/*! generated <%= grunt.template.today("yyyy-mm-dd h:mm:ss TT") %> */';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: 'dist/js',{%= jsdoc ? "\n\
            jsdoc: 'jsdoc'," : ""%}
            css: 'dist/css'
        },
        {%= sass ? "compass: {\n\
            options: {\n\
                cssDir: 'dist/css',\n\
                sassDir: 'src/css',\n\
                specify: 'src/css/style.scss',\n\
                imagesDir: 'dist/css/images',\n\
                javascriptDir: 'dist/js',\n\
                fontsDir: 'dist/css/fonts',\n\
                relativeAssets: true,\n\
                outputStyle: 'expanded'\n\
            },\n\
            dev: {\n\
                options: {\n\
                    environment: 'development'\n\
                }\n\
            },\n\
            dist: {\n\
                options: {\n\
                    environment: 'production'\n\
                }\n\
            }\n\
        }," : "" %}
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
                src: ['**', '!**/*.{js,{%= sass ? 'scss' : 'css' %}}'],
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
                    'dist/css/style.min.css': '{%= sass ? 'dist/css/style.css' : 'src/css/**/*.css' %}'
                }
            }
        },
        {%= jstest ? "jasmine: {\n\
            options: {\n\
                specs: 'test/**/{spec,*Spec}.js',\n\
                vendor: 'vendor/**/*.js'\n\
            },\n\
            src: {\n\
                src: 'src/**/*.js'\n\
            },\n\
            dist: {\n\
                src: 'dist/**/*.js'\n\
            }\n\
        }," : "" %}
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
                files: ['.csslintrc', 'src/**/*.{%= sass ? "scss" : "css" %}'],
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
        {%= jsdoc ? "yuidoc: {\n\
            compile: {\n\
                name: '<%= pkg.title || pkg.name %>',\n\
                description: '<%= pkg.description %>',\n\
                version: '<%= pkg.version %>',\n\
                options: {\n\
                    linkNatives: true,\n\
                    paths: 'src/js/',\n\
                    outdir: 'jsdoc'\n\
                }\n\
            }\n\
        }," : ""%}
        htmllint: {
            src: 'src/**/*.html'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');{%= sass ? "\n\
    grunt.loadNpmTasks('grunt-contrib-compass');" : "" %}
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');{%= jsdoc ? "\n\
    grunt.loadNpmTasks('grunt-contrib-yuidoc');" : "" %}{%= jstest ? "\n\
    grunt.loadNpmTasks('grunt-contrib-jasmine');" : "" %}
    grunt.loadNpmTasks('grunt-html');

    grunt.registerTask('default', ['buildJS', 'buildCSS', 'htmllint', 'copy']);
    grunt.registerTask('buildJS', ['jshint:grunt', 'jshint:src'{%= jstest ? ", 'jasmine:src'" : ""%}, 'clean:js', 'concat', 'jshint:dist'{%= jstest ? ", 'jasmine:dist'" : ""%}, 'uglify', 'jasmine:dist'{%= jsdoc ? ", 'clean:jsdoc', 'yuidoc'" : ""%}]);
    grunt.registerTask('buildCSS', ['clean:css'{%=sass ? ", 'compass:dev'" : ""%}, 'csslint', 'cssmin']);
};