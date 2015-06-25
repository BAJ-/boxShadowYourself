module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    coffee: {
      dev: {
        expand: true,
        cwd: 'src/scripts/',
        src: '**/*.coffee',
        dest: 'src/js/',
        ext: '.js'
      },
      stage: {
        options: {
          join: true
        },
        src: 'src/scripts/**/*.coffee',
        dest: 'staging/js/app.js'
      }
    },
    less: {
      dev: {
        expand: true,
        cwd: 'src/styles/',
        src: '**/*_compile.less',
        dest: 'src/css/',
        ext: '.css'
      },
      stage: {
        options: {
          join: true
        },
        src: 'src/styles/**/*_compile.less',
        dest: 'staging/css/styles.css'
      }
    },
    uglify: {
      coffee: {
        src: "<%= coffee.stage.dest %>",
        dest: "<%= coffee.stage.dest %>"
      }
    },
    cssmin: {
      less: {
        src: "<%= less.stage.dest %>",
        dest: "<%= less.stage.dest %>"
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: [
          '**/*',
          '!**/css/**',
          '!**/js/**',
          '!**/scripts/**',
          '!**/styles/**'
        ],
        dest: 'staging/'
      }
    },
    watch: {
      dev: {
        files: ['src/**/*.html', 'src/styles/**/*.less', 'src/scripts/**/*.coffee'],
        tasks: ['coffee:dev', 'less:dev'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['coffee:dev', 'less:dev']);

  // Staging tasks
  grunt.registerTask('stage', ['copy', 'coffee:stage', 'less:stage', 'uglify:coffee', 'cssmin:less']);
};
