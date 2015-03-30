/** @jsx React.DOM */
var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    open = require('gulp-open');

gulp
  // performs magic
  .task('browserify', function(){
    gulp.src('src/js/main.js')
      .pipe(
        browserify({ 
          transform: 'reactify', 
          debug: !gulp.env.production 
        })
      )
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
  })

  // moves source files to dist
  .task('copy', function(){
    gulp
      .src('src/index.html')
      .pipe(gulp.dest('dist'));
	 
     gulp
      .src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
  })

  // local development server
  .task('connect', function(){
    connect.server({
      root: ['dist'],
      port: '8080',
      base: 'http://localhost',
      livereload: true
    });
  })  

  // opens the application in chrome
  .task('open', function(){
    gulp
      .src('dist/index.html')
      .pipe(
        open('', { url: 'http://localhost:8080/' })
      );
  })

  // build the application
  .task('default', ['browserify', 'copy', 'connect', 'open'])
  
  // watch for source changes
  .task('watch', function(){
    gulp.watch('src/**/*.*', ['default']);
  });
