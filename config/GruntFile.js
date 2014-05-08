module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    theme: 'default',
    paths: {
    	scss: '../themes/<%= theme %>/scss',
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
    compass: {
      dist: {                   // Target
        options: {
          sassDir: '<%= paths.scss %>',
          cssDir: '<%= paths.css %>',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: '<%= paths.scss %>',
          cssDir: '<%= paths.css %>',
          outputStyle: 'expanded'
        }
      }
    },
    watch: {
	  	dist: {
		    files: [
          'GruntFile.js',
		    	// '<%= paths.functionalJs %>/**/*.js',
		    	'<%= paths.themeJs %>/**/*.js',
          '<%= paths.scss %>/**/*.scss'
		    ],
		    tasks: ['uglify:dist', 'compass:dist']
  		},
  		dev: {
  			files: [
          // '<%= paths.functionalJs %>/**/*.js',
          '<%= paths.themeJs %>/**/*.js',
          '<%= paths.scss %>/**/*.scss'
        ],
        tasks: ['uglify:dev', 'compass:dev']
  		}
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify:dev', 'compass:dev', 'watch:dev']);
  grunt.registerTask('product', ['uglify:dist', 'compass:dist', 'watch:dist']);

};