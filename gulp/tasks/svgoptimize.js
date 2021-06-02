// =========================================================
// Gulp Task: svgoptimize
// Description:
// npm install --save-dev del gulp-svgmin
// =========================================================
var log                 = require('fancy-log');
var config              = require('../config.js'),
    svgmin              = require('gulp-svgmin'),
    del                 = require('del');

module.exports = function(gulp, plugins) {
    return function () {
        log('start svgoptimize');
// -------------------------------------------- Start Task
// ---- move js files
        del([config.images.polaroid.dest]);
// ---- move js files
        var copyfiles =
            gulp.src(config.images.vendor + 'svg/*.svg')
            // .pipe(svgmin(function (file) {
            //     let prefix = path.basename(file.relative, path.extname(file.relative));
            //     return {
            //         plugins: [{
            //             cleanupIDs: {
            //                 prefix: prefix + '-',
            //                 minify: true
            //             }
            //         }]
            //     }
            // }))
            .pipe(gulp.dest(config.images.polaroid.dest));
// ---------------------------------------------- End Task
        log('----------------');
        return copyfiles;
    };
};
