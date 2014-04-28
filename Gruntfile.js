module.exports = function(grunt) {

    // Register the NPM tasks we want
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');

    // Register the tasks we want to run
    grunt.registerTask('default', [
        'bower:install',
        'concat:css',
        'concat:js',
        'cssmin:css',
        'uglify:js'
    ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            assets: 'assets',
            lib: '<%= paths.assets %>/lib',
            css : '<%= paths.assets %>/css',
            js: '<%= paths.assets %>/js'
        },

        bower: {
          install: {
            options: {
              targetDir: "assets/lib"
            }
          }
        },

        concat: {
            css: {
                src: [
                    '<%= paths.css %>/*',
                    '<%= paths.css %>/*/*.css',
                ],
                dest: '<%= paths.assets %>/dashboard.css'
            },
            js : {
                src: [
                    '<%= paths.js %>/*',
                    '<%= paths.lib %>/*/*.js',
                    '!<%= paths.lib %>/handlebars.js/*'
                ],
                dest: '<%= paths.assets %>/dashboard.js'
            }
        },
        cssmin : {
            css:{
                src: '<%= paths.assets %>/dashboard.css',
                dest: '<%= paths.assets %>/dashboard.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    '<%= paths.assets %>/dashboard.min.js' : ['<%= paths.assets %>/dashboard.js']
                }
            }
        },
        watch: {
          files: ['<%= paths.ccss %>/*'],
          tasks: ['concat', 'cssmin']
        },
    });
};
