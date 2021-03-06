var gulp = require('gulp');
var webserver = require('gulp-webserver');

// https://github.com/gobwas/gulp-sprite-generator
var sprite = require('gulp-sprite-generator');

var compass   = require('gulp-compass');


gulp.task('compass',function(){
    gulp.src('./css_src/*.scss')
        .pipe(compass({
            sourcemap: true,
            time: true,
      css: './css_src/',
      sass: './css_src/',
      style: 'compact' //nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('copy_file', function(){
  gulp.src(
    '../src/**.js',
    {base: '../src/'}
  ).pipe(gulp.dest('./app/js/'));
})

gulp.task('sprites', function() {
    var spriteOutput;

    spriteOutput = gulp.src("./css_src/*.css")
        .pipe(sprite({
            baseUrl: "./images",
            spriteSheetName: "sprite.png",
            spriteSheetPath: "./images"
        }));

    spriteOutput.css.pipe(gulp.dest("./app/css"));
    spriteOutput.img.pipe(gulp.dest("./app/css/images"));
});

gulp.task('webserver', function() {
  gulp.src('./app/')
    .pipe(webserver({
      port:3001,
      livereload: true,
      directoryListing: false,
//       open: true,
      fallback: 'index.html'
    }));
});

// watch files
gulp.watch('../src/**.js', function(){
  gulp.run('copy_file');
});
gulp.watch('./css_src/**.css', function() {
    gulp.run('sprites');
});
gulp.watch('./css_src/**.scss', function() {
    gulp.run('compass','sprites');
});


gulp.task('default',['copy_file', 'compass', 'sprites', 'webserver']);