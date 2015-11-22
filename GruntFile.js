module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var paths = {
    src: 'src',
    dist: 'dist',
    imgSrc: 'src/img',
    imgDist: 'dist/img',
    scss: 'src/scss',
    css: 'dist/css',
    views: 'src/views',
    jsSrc: 'src/js',
    jsDist: 'dist/js',
    bower: 'bower_components'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: paths,
    eslint: {
      options: {
        quiet: true
      },
      target: ['<%= paths.jsSrc %>/*.js']
    },
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          cwd: '<%= paths.views %>',
          src: '{*/,}*.jade',
          dest: '<%= paths.dist %>',
          expand: true,
          ext: '.html'
        }]
      }
    },
    wiredep: {
      target: {
        src: [
          '<%= paths.src %>/**/*.jade',
          '<%= paths.scss %>/*.scss'
        ],
        dependencies: true,
        devDependencies: false
      }
    },
    sass: {
      compile: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: [{
          expand: true,
          cwd: '<%= paths.scss %>',
          src: ['*.scss'],
          dest: '<%= paths.css %>',
          ext: '.css'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: ['{*/,}*.html'],
          dest: '<%= paths.dist %>'
        }]
      }
    },
    imagemin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= paths.imgSrc %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= paths.imgDist %>'
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= paths.dist %>',
          debug: true,
          livereload: true
        }
      }
    },
    useminPrepare: {
      html: '<%= paths.dist %>/{*/,}*.html'
    },
    usemin: {
      html: '<%= paths.dist %>/{*/,}*.html'
    },
    watch: {
      scripts: {
        files: ['<%= paths.jsSrc %>/{*/,}*.js'],
        tasks: ['eslint', 'concat', 'uglify'],
        options: {
          liveReload: true
        }
      },
      styles: {
        files: ['<%= paths.scss %>/{*/,}*.scss'],
        tasks: ['sass'],
        options: {
          liveReload: true
        }
      },
      jade: {
        files: ['<%= paths.src %>/{*/,}*.jade'],
        tasks: [
          'jade',
          'useminPrepare',
          'concat',
          'uglify',
          'cssmin',
          // 'filerev',
          'usemin',
          'htmlmin'
        ],
        options: {
          liveReload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'jade']
      },
      images: {
        files: ['<%= paths.imgSrc %>/**/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      }
  	}
  });

  grunt.registerTask('default', [
    'wiredep',
    'sass',
    'jade', 
    'useminPrepare', 
    'concat',
    'uglify',
    'cssmin',
    // 'filerev',
    'usemin',
    'htmlmin',
    'connect', 
    'watch'
  ]);
};