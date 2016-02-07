module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.initConfig({
        jshint: {
            files: ['client/js/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["client/public/css/"]
                },
                files: {
                    "client/public/css/styles.css": "client/less/event.less"
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 version']
                    })
                ]
            },
            dist: {
                src: 'client/public/css/styles.css'
            }
        },
        watch: {
            jsfiles: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            scripts: {
                files: ['client/js/*.js'],
                tasks: ['concat']
            },
            css: {
                files: ['client/less/*.less'],
                tasks: ['less']
            },
            prefix: {
                files: ['lient/public/css/styles.css'],
                tasks: ['postcss']
            }
        },
        concat: {
            basic_and_extras: {
                files: {
                    'client/public/js/index.js': ['client/js/*.js']
                }
            }
        },
        nodemon: {
          dev: {
            script: 'app.js'
          }
        },
        concurrent: {
          options: {
            logConcurrentOutput: true
          },
          tasks: ['nodemon', 'watch']
        }
    });

    grunt.registerTask('default', ['nodemon', 'jshint', 'watch']);

};
