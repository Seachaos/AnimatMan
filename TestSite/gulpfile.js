var gulp = require('gulp');
var webserver = require('gulp-webserver');

// https://github.com/gobwas/gulp-sprite-generator
var sprite = require('gulp-sprite-generator');


gulp.task('sprites', function() {
    var spriteOutput;

    spriteOutput = gulp.src("./css_src/*.css")
        .pipe(sprite({
            baseUrl: "./images",
            spriteSheetName: "sprite.png",
            spriteSheetPath: "./images",
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

gulp.watch('./css_src/**.css', function() {
    gulp.run('sprites');
});

gulp.task('default',['sprites', 'webserver']);