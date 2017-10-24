const gulp       = require('gulp');
const plumber    = require('gulp-plumber'); // used for error catching during watch
const connect    = require('gulp-connect');
const opn        = require('opn'); // for opening the browser

const sourcePaths = {
  images:     ['./images/**/*'],
  templates:  ['./*.html']
};

const server = {
  host: 'localhost',
  port: '8001'
};

gulp.task('images', function () {
  return gulp.src( sourcePaths.images )
    .pipe(connect.reload());
});

gulp.task('templates', function() {
  return gulp.src( sourcePaths.templates )
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
    port: server.port,
    livereload: true
  });
});

gulp.task('openbrowser', function() {
  return opn( 'http://' + server.host + ':' + server.port );
});

// Rerun the task when a file changes
gulp.task('watch', function(){
  gulp.watch(sourcePaths.images, ['images']);
  gulp.watch(sourcePaths.templates, ['templates']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'webserver', 'openbrowser']);