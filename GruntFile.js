module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
    	less: 'theme/less',
    	css: 'theme/css',
    	js: 'js',
      bower: 'bower_components'
    },
    less: {
      prod: {
        options: {
          cleancss: true,
          compress: true
        },
        files: {
          '<%= paths.css %>/bootstrap.min.css': '<%= paths.less %>/bootstrap/bootstrap.less',
          '<%= paths.css %>/app.min.css': '<%= paths.less %>/app.less'
        }
      },
      dev: {
        files: {
          '<%= paths.css %>/bootstrap.css': '<%= paths.less %>/bootstrap/bootstrap.less',
          '<%= paths.css %>/app.css': '<%= paths.less %>/app.less'
        }
      }
    },
    concat: {
      dev: {
        options: {
          banner: '/*!\n * <%= pkg.name %> combined client side JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * http://jennieji.github.io | Licence: MIT\n */\n'
        },
        src: [
          '<%= paths.bower %>/angular/angular.js',
          '<%= paths.bower %>/jquery/jquery.min.js',
          '<%= paths.js %>/*/**/*.js'
        ],
        dest: '<%= paths.js %>/app.js'
      }
    },
    uglify: {
      prod: {
        options: {
          banner: '/*!\n * <%= pkg.name %> compressed client side JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * http://jennieji.github.io | Licence: MIT\n */\n'
        },
        files: {
        	'<%= paths.js %>/app.min.js': '<%= concat.dev.dest %>'
        }
      }
    },
    watch: {
  		js: {
  			files: ['<%= concat.dev.src %>'],
        tasks: ['concat', 'uglify']
  		},
      less: {
        files: [
          '<%= paths.less %>/**/*.less'
        ],
        tasks: ['less:dev']
      }
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'less', 'watch']);
  grunt.registerTask('product', ['uglify', 'less:prod']);
  grunt.registerTask('dev', ['concat', 'less:dev']);

};