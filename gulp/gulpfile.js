// Packages
const
    gulp = require('gulp');

const
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    del = require('del');

const
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    imagemin = require('gulp-imagemin'),
    sharpResponsive = require("gulp-sharp-responsive");

const tar = require('gulp-tar');
const gzip = require('gulp-gzip');

const
    lec = require('gulp-line-ending-corrector');

// // import tasks
// const img = require("./gulp-tasks/images.js");

const
    paths = {
        images: {
            bandmembers: {
                src: 'vendor/images/bandmembers/**/*.jpg',
                dest: 'public/img/bandmembers'
            },
            breaker: {
                src: 'vendor/images/breakerimage/**/*.jpg',
                dest: 'public/img/breakerimage'
            },
            gallery: {
                src: 'vendor/images/gallery/**/*.jpg',
                dest: 'public/img/gallery/',
            },
            homeslider: {
                src: 'vendor/images/homeslider/**/*.jpg',
                dest: 'public/img/homeslider'
            },
            polaroid: {
                src: 'vendor/images/polaroid/**/*.jpg',
                dest: 'public/img/polaroid'
            },
        }
    };

//CLEAN TASKS
var clean_images_bandmembers = () => {
    return del([paths.images.bandmembers.dest]);
}
var clean_images_breaker = () => {
    return del([paths.images.breaker.dest]);
}
var clean_images_gallery = () => {
    return del([paths.images.gallery.dest]);
}
var clean_images_homeslider = () => {
    return del([paths.images.homeslider.dest]);
}
var clean_images_polaroid = () => {
    return del([paths.images.polaroid.dest]);
}

var images_bandmembers = () => {
    return gulp.src(paths.images.bandmembers.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.bandmembers.dest));
}
var images_breaker = () => {
    return gulp.src(paths.images.breaker.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.breaker.dest));
}
var images_gallery = () => {
    return gulp.src(paths.images.gallery.src)
        .pipe(sharpResponsive({
            formats: [
                // jpeg
                { width: 640, format: "jpeg", rename: { suffix: "-sm" } },
                { width: 768, format: "jpeg", rename: { suffix: "-md" } },
                { width: 1024, format: "jpeg", rename: { suffix: "-lg" } },
                // // webp
                // { width: 640, format: "webp", rename: { suffix: "-sm" } },
                // { width: 768, format: "webp", rename: { suffix: "-md" } },
                // { width: 1024, format: "webp", rename: { suffix: "-lg" } },
                // // avif
                // { width: 640, format: "avif", rename: { suffix: "-sm" } },
                // { width: 768, format: "avif", rename: { suffix: "-md" } },
                // { width: 1024, format: "avif", rename: { suffix: "-lg" } },
            ]
        }))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.gallery.dest));
}
var images_homeslider = () => {
    return gulp.src(paths.images.homeslider.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.homeslider.dest));
}
var images_polaroid = () => {
    return gulp.src(paths.images.polaroid.src)
        .pipe(imagemin())
        .pipe(sharpResponsive({
            formats: [
                // jpeg
                { width: 50, format: "jpeg", rename: { suffix: "-sm" } },
                { width: 100, format: "jpeg", rename: { suffix: "-md" } },
                { width: 200, format: "jpeg", rename: { suffix: "-lg" } },
                // // webp
                // { width: 640, format: "webp", rename: { suffix: "-sm" } },
                // { width: 768, format: "webp", rename: { suffix: "-md" } },
                // { width: 1024, format: "webp", rename: { suffix: "-lg" } },
                // // avif
                // { width: 640, format: "avif", rename: { suffix: "-sm" } },
                // { width: 768, format: "avif", rename: { suffix: "-md" } },
                // { width: 1024, format: "avif", rename: { suffix: "-lg" } },
            ]
        }))
        .pipe(gulp.dest(paths.images.polaroid.dest));
}

var build_svg_optimize = function () {
    return gulp.src(paths.vendor + 'svg/*.svg')
        .pipe(svgmin(function (file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(gulp.dest(paths.temp + 'img'));
};

var move_ReleaseNotes = function() {
    // return gulp.src(paths.vendor + 'releasenotes.txt')
    //   .pipe(gulp.dest('_release'))
    //   .pipe(gulp.dest('_release/Backend'))
    //   .pipe(gulp.dest('_release/Backend/DB/DB - ' + pckg.version));

    const releasenotes = gulp.src(paths.vendor + 'releasenotes.txt')
        .pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}))
        .pipe(gulp.dest('_release/Backend/DB/DB-' + pckg.dbversion));

    const bundle = gulp.src(paths.vendor + 'releasenotes - bundle.txt')
        .pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}))
        .pipe(gulp.dest('_release'));

    return merge(releasenotes, bundle);
};

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = gulp.series(
    clean_images_bandmembers, images_bandmembers,
    clean_images_breaker, images_breaker,
    clean_images_homeslider, images_homeslider,
    clean_images_gallery, images_gallery,
    clean_images_polaroid, images_polaroid
    /*, gulp.parallel(styles, scripts)*/
);


/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;