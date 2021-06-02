// =========================================================
// Gulp Task: polaroid
// Description:
// npm install --save-dev del merge-stream gulp-imagemin
// =========================================================
var log                 = require('fancy-log');
var config              = require('../config.js'),
    merge               = require('merge-stream'),
    imagemin            = require('gulp-imagemin'),
    sharpResponsive     = require("gulp-sharp-responsive");

module.exports = function(gulp, plugins) {
    return function () {
        log('start polaroid');
// -------------------------------------------- Start Task
// ---- move js files
        var copyfiles_index =
            gulp.src(config.images.polaroid.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 1, format: "webp", rename: { suffix: "" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.polaroid.dest));
        var copyfiles_thumb =
            gulp.src(config.images.polaroid.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 100, format: "jpeg", rename: { suffix: "-thumb" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.polaroid.dest + 'thumb'));
        var copyfiles_sm =
            gulp.src(config.images.polaroid.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 190, format: "jpeg", rename: { suffix: "-sm" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.polaroid.dest + 'sm'));
        var copyfiles_md =
            gulp.src(config.images.polaroid.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 200, format: "jpeg", rename: { suffix: "-md" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.polaroid.dest + 'md'));
        var copyfiles_lg =
            gulp.src(config.images.polaroid.src)
                .pipe(sharpResponsive({
                    formats: [
                        // jpeg
                        { width: 280, format: "jpeg", rename: { suffix: "-lg" } }
                    ]
                }))
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.polaroid.dest + 'lg'));
// ---------------------------------------------- End Task
        log('----------------');
        return merge(copyfiles_thumb, copyfiles_sm, copyfiles_md, copyfiles_index, copyfiles_lg);
    };
};
