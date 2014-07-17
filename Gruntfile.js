module.exports = function(grunt) {

    // Register the NPM tasks we want
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-string-replace');

    // Register the tasks we want to run
    grunt.registerTask('default', [
        'bower:install',
        'copy:fontawesome',
        'copy:nanoscrollermap',
        'copy:nanoscrollercoffeescript',
        "string-replace",
        'concat:css',
        'concat:js',
        'cssmin:css'
        //'uglify:js'
    ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            assets: 'assets',
            bower: 'bower_components',
            lib: '<%= paths.assets %>/lib',
            css : '<%= paths.assets %>/css',
            js: '<%= paths.assets %>/js',
            dist: '<%= paths.assets %>/dist'
        },

        bower: {
          install: {
            options: {
              targetDir: "assets/lib"
            }
          }
        },

        copy: {
            nanoscrollermap: {
                expand: true,
                flatten: true,
                src: "<%= paths.bower %>/nanoscroller/bin/javascripts/jquery.nanoscroller.js.map",
                dest: "<%= paths.dist %>/"
            },
            nanoscrollercoffeescript: {
                expand: true,
                flatten: true,
                src: "<%= paths.bower %>/nanoscroller/coffeescripts/jquery.nanoscroller.coffee",
                dest: "<%= paths.dist %>/"
            },
            fontawesome: {
                expand: true,
                flatten: true,
                src: "<%= paths.assets %>/lib/fontawesome/fonts/**",
                dest: "<%= paths.assets %>/fonts/"
            }
        },

        'string-replace': {
          inline: {
            options: {
              replacements: [
                {
                    pattern: "../../coffeescripts/",
                    replacement: './'
                }
              ]
            },
            files: {
                "<%= paths.dist %>/jquery.nanoscroller.js.map" :  "<%= paths.dist %>/jquery.nanoscroller.js.map"
            }
          }
        },

        concat: {
            css: {
                src: [
                    '<%= paths.lib %>/fontawesome/css/font-awesome.min.css',
                    '<%= paths.lib %>/*/*.css',
                    '<%= paths.css %>/*',
                ],
                dest: '<%= paths.dist %>/dashboard.css'
            },
            js : {
                options: {
                    separator: ';',
                },
                src: [
                    '<%= paths.lib %>/pace/pace.min.js',
                    '<%= paths.lib %>/pace/pace.min.js',
                    '<%= paths.lib %>/shapeshift/core/jquery.shapeshift.min.js',
                    '<%= paths.lib %>/nanoscroller/jquery.nanoscroller.js',
                    '<%= paths.bower %>/highlight.min/index.js',
                    '<%= paths.bower %>/reMarked/reMarked.js',
                    '<%= paths.lib %>/readmore/readmore.js',
                    '<%= paths.js %>/*'
                ],
                dest: '<%= paths.dist %>/dashboard.js'
            }
        },
        cssmin : {
            css:{
                src: '<%= paths.dist %>/dashboard.css',
                dest: '<%= paths.dist %>/dashboard.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%= paths.dist %>/dashboard.min.js' : ['<%= paths.dist %>/dashboard.js']
                }
            }
        },
        watch: {
          files: ['<%= paths.css %>/*', '<%= paths.js %>/*', '<%= paths.lib %>/*'],
          tasks: ['default']
        },
    });
};