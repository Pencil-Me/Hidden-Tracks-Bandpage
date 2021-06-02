// =========================================================
// Gulp Task: Template
// Description:
// npm install --save-dev del gulp-load-plugins
// =========================================================
var config              = require('../config.js'),
    merge               = require('merge-stream'),
    imagemin            = require('gulp-imagemin'),
    del                 = require('del');

module.exports = function(gulp, plugins) {
    return function () {
// -------------------------------------------- Start Task
// ---- move js files
        var deletefiles =
            del([config.images.polaroid.dest]);
// ---- move js files
        var copyfiles =
            gulp.src(config.images.polaroid.src)
                .pipe(imagemin())
                .pipe(gulp.dest(config.images.polaroid.dest));
// ---------------------------------------------- End Task
        return merge( deletefiles, copyfiles );
    };
};
