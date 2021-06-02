// =========================================================
// Gulp Task: deleteimages
// Description:
// npm install --save-dev del
// =========================================================
var log                 = require('fancy-log');
var config              = require('../config.js'),
    merge               = require('merge-stream'),
    del                 = require('gulp-clean');

module.exports = function(gulp, plugins) {
    return function () {
        log('start deleteimages');
// -------------------------------------------- Start Task
// ---- move js files
        var delete1 =
            gulp.src(config.images.bandmembers.dest, {read: false})
                .pipe(del({force: true}));
        var delete2 =
            gulp.src(config.images.breaker.dest, {read: false})
                .pipe(del({force: true}));
        var delete3 =
            gulp.src(config.images.gallery.dest, {read: false})
                .pipe(del({force: true}));
        var delete4 =
            gulp.src(config.images.homeslider.dest, {read: false})
                .pipe(del({force: true}));
        var delete5 =
            gulp.src(config.images.polaroid.dest, {read: false})
                .pipe(del({force: true}));
// ---------------------------------------------- End Task
        log('----------------');
        return merge(delete1,delete2,delete3,delete4,delete5);
    };
};
