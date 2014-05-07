module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    theme: 'default',
    paths: {
    	scss: '../themes/<%= theme %>/scss',
    	css: '../themes/<%= theme %>/css',
    	themeJs: '../themes/<%= theme %>/js',
    	functionalJs: '../scripts'
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false,
        compress: false
      },
      build: {
        files: {
        	'<%= paths.themeJs %>/theme.min.js': [
        		'<%= paths.themeJs %>/lib/*.js',
        		'<%= paths.themesJs %>/dev/*.js'
        	],
        	'<%= paths.functionalJs %>/app.min.js': [
        		'<%= paths.functionalJs %>/lib/*.js',
        		'<%= paths.functionalJs %>/dev/*.js'
        	]
        }
      }
    },
    sass: {
    	options: {

    	},
		files: {
			'<%= paths.css %>/screen.min.css': '<%= paths.scss %>/screen.scss',
			'<%= paths.css %>/print.min.css': '<%= paths.scss %>/print.scss'
		}
    },
    watch: {
	  	scripts: {
		    files: [
		    	'scripts/**/*.js',
		    	'themes/<%= theme %>/js/**/*.js'
		    ],
		    tasks: ['uglify']
		},
		styles: {
			files: 'themes/<%= theme %>/scss/**/*.scss',
			tasks: ['sass']
		}
	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'watch']);

};