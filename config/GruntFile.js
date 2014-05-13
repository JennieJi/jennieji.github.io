module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    theme: 'default',
    paths: {
      scss: '../themes/<%= theme %>/scss',
    	less: '../themes/<%= theme %>/less',
    	css: '../themes/<%= theme %>/css',
      // functionalJs: '../app',
    	themeJs: '../themes/<%= theme %>/js'
    },
    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          // '<%= paths.functionalJs %>/app.min.js': [
          //   '<%= paths.functionalJs %>/lib/*.js',
          //   '<%= paths.functionalJs %>/dev/*.js'
          // ],
        	'<%= paths.themeJs %>/theme.min.js': [
        		'<%= paths.themeJs %>/lib/*.js',
        		'<%= paths.themeJs %>/dev/*.js'
        	]
        }
      },
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          beautify: true,
          compress: false
        },
        files: {
          // '<%= paths.functionalJs %>/app.js': [
          //   '<%= paths.functionalJs %>/lib/*.js',
          //   '<%= paths.functionalJs %>/dev/*.js'
          // ],
          '<%= paths.themeJs %>/theme.js': [
            '<%= paths.themeJs %>/lib/*.js',
            '<%= paths.themeJs %>/dev/*.js'
          ]
        }
      }
    },
    // compass: {
    //   dist: {                   // Target
    //     options: {
    //       sassDir: '<%= paths.scss %>',
    //       cssDir: '<%= paths.css %>',
    //       environment: 'production'
    //     }
    //   },
    //   dev: {                    // Another target
    //     options: {
    //       sassDir: '<%= paths.scss %>',
    //       cssDir: '<%= paths.css %>',
    //       outputStyle: 'expanded'
    //     }
    //   }
    // },
    less: {
      dist: {
        options: {
          paths: ['<%= paths.css %>'],
          cleancss: true,
          compress: true
        },
        files: {
          '<%= paths.css %>/bootstrap.css': '<%= paths.less %>/bootstrap/bootstrap.less',
          '<%= paths.css %>/bootstrap-theme.css': '<%= paths.less %>/bootstrap/theme.less',
          '<%= paths.css %>/app.css': '<%= paths.less %>/app.less'
        }
      },
      dev: {
        options: {
          paths: ['<%= paths.css %>']
        },
        files: {
          '<%= paths.css %>/bootstrap.css': '<%= paths.less %>/bootstrap/bootstrap.less',
          '<%= paths.css %>/bootstrap-theme.css': '<%= paths.less %>/bootstrap/theme.less',
          '<%= paths.css %>/app.css': '<%= paths.less %>/app.less'
        }
      }
    },
    watch: {
	  	dist: {
		    files: [
          'GruntFile.js',
		    	// '<%= paths.functionalJs %>/**/*.js',
		    	'<%= paths.themeJs %>/**/*.js',
          // '<%= paths.scss %>/**/*.scss'
          '<%= paths.less %>/**/*.less'
		    ],
		    tasks: ['uglify:dist'/*, 'compass:dist'*/,'less:dist']
  		},
  		dev: {
  			files: [
          // '<%= paths.functionalJs %>/**/*.js',
          '<%= paths.themeJs %>/**/*.js',
          // '<%= paths.scss %>/**/*.scss'
          '<%= paths.less %>/**/*.less'
        ],
        tasks: ['uglify:dev'/*, 'compass:dev'*/,'less:dev']
  		}
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uglify:dev'/*, 'compass:dev'*/, 'less:dev', 'watch:dev']);
  grunt.registerTask('product', ['uglify:dist'/*, 'compass:dist'*/, 'less:dist', 'watch:dist']);

};