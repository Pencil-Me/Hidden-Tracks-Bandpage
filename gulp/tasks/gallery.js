// =========================================================
// Gulp Task: gallery
// Description:
// npm install --save-dev gulp-imagemin gulp-sharp-responsive merge-stream
// =========================================================
var log                 = require('fancy-log');
var config              = require('../config.js'),
    merge               = require('merge-stream'),
    imagemin            = require('gulp-imagemin'),
    sharpResponsive     = require("gulp-sharp-responsive");

module.exports = function(gulp, plugins) {
    return function () {
        log('start gallery');
// -------------------------------------------- Start Task
// ---- move js files
        var copyfiles_index =
            gulp.src(config.images.gallery.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 1, format: "webp", rename: { suffix: "" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.gallery.dest));
        var copyfiles_thumb =
            gulp.src(config.images.gallery.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 400, format: "jpeg", rename: { suffix: "-thumb" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.gallery.dest + 'thumb'));
        var copyfiles_sm =
            gulp.src(config.images.gallery.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 640, format: "jpeg", rename: { suffix: "-sm" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.gallery.dest + 'sm'));
        var copyfiles_md =
            gulp.src(config.images.gallery.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 768, format: "jpeg", rename: { suffix: "-md" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.gallery.dest + 'md'));
        var copyfiles_lg =
            gulp.src(config.images.gallery.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 1024, format: "jpeg", rename: { suffix: "-lg" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.gallery.dest + 'lg'));
// ---------------------------------------------- End Task
        log('----------------');
        return merge(copyfiles_thumb, copyfiles_sm, copyfiles_md, copyfiles_index, copyfiles_lg);
    };
};
