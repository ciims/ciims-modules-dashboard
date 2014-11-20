module.exports = function(grunt) {

    // Register the NPM tasks we want
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-run-grunt');

    // Register the tasks we want to run
    grunt.registerTask('default', [
        'bower:install',
        'run_grunt:lepture_editor',
        'copy:lepture_editor',
        'copy:markdown_mark',
        'copy:fontawesome',
        'copy:nanoscrollermap',
        'copy:nanoscrollercoffeescript',
        'replace:nanoscrollerminmap',
        'replace:fontawesome',
        'concat:css',
        'concat:js',
        'cssmin:css',
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
                src: "<%= paths.assets %>/lib/fontawesome/**",
                dest: "<%= paths.dist %>/fonts/"
            },
            lepture_editor: {
                expand: true,
                flatten: true,
                src: "<%= paths.bower %>/lepture-editor/build/fonts/**",
                dest: "<%= paths.dist %>/fonts/"  
            },
            markdown_mark: {
                expand: true,
                flatten: true,
                src: "<%= paths.bower %>/markdown-mark/icon-font/fonts/**",
                dest: "<%= paths.dist %>/fonts/"
            }
        },

        replace: {
            nanoscrollerminmap: {
                src: [ "<%= paths.dist %>/jquery.nanoscroller.js.map" ],
                overwrite: true, 
                replacements : [{
                    from: "..\/..\/coffeescripts\/",
                    to: "./"
                }]
            },

            fontawesome: {
                src: [ "<%= paths.lib %>/fontawesome/font-awesome.css" ],
                overwrite: true, 
                replacements : [{
                    from: "..\/fonts\/",
                    to: "./fonts/"
                }]
            }
        },

        concat: {
            css: {
                src: [
                    '<%= paths.bower %>/alertify.js/themes/alertify.core.css',
                    '<%= paths.bower %>/lepture-editor/build/editor.css',
                    '<%= paths.bower %>/dropzone/downloads/css/basic.css',
                    '<%= paths.bower %>/dropzone/downloads/css/dropzne.css',
                    '<%= paths.lib %>/markdown-mark/icon-font/style.css',
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
                    '<%= paths.lib %>/shapeshift/core/jquery.shapeshift.min.js',
                    '<%= paths.lib %>/nanoscroller/jquery.nanoscroller.js',
                    '<%= paths.lib %>/alertify.js/alertify.js',
                    '<%= paths.bower %>/highlight.min/index.js',
                    '<%= paths.bower %>/reMarked/reMarked.js',
                    '<%= paths.bower %>/jquery-timeago/jquery.timeago.js',
                    '<%= paths.bower %>/lepture-editor/build/editor.js',
                    '<%= paths.bower %>/dropzone/downloads/dropzone.min.js',
                    '<%= paths.lib %>/readmore/readmore.js',
                    '<%= paths.lib %>/jquery.tagsinput/jquery.tagsinput.min.js',
                    '<%= paths.lib %>/datetimepicker/jquery.datetimepicker.js',
                    '<%= paths.lib %>/shapeshift/core/jquery.shapeshift.min.js',
                    '<%= paths.lib %>/jquery-getCSS/index.js',
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

        run_grunt: {
            options: {
                minimumFiles: 1,
                task : ['build']
            },
            lepture_editor: {
                options: {
                    log: false
                },
                src: ['<%= paths.bower %>/lepture-editor/Gruntfile.js',]
            },
        },

        watch: {
          files: ['<%= paths.css %>/*', '<%= paths.js %>/*', '<%= paths.lib %>/*'],
          tasks: ['default']
        },
    });
};
