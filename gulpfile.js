// =========================================================
// Project: PROJECT-NAME
// NOTE: Using Gulp 4
// npm install --save-dev gulp-load-plugins gulp
// =========================================================
var gulp 		= require('gulp'),
    plugins		= require('gulp-load-plugins')();

// ---------------------------------- Gulp Terminal Commands
// ---- gulp
// ---- gulp build
// ---- gulp new-task

// --------------------function to get tasks from gulp/tasks
function getTask(task) {
    return require('./gulp/tasks/' + task)(gulp, plugins);
}

// ---------------------------------------------- Gulp Tasks
gulp.task('deleteimages', getTask('deleteimages'));
gulp.task('bandmembers', getTask('bandmembers'));
gulp.task('breaker', getTask('breaker'));
gulp.task('homeslider', getTask('homeslider'));
gulp.task('gallery', getTask('gallery'));
gulp.task('polaroid', getTask('polaroid'));

const build = gulp.series(
    'deleteimages',
    'bandmembers',
    'breaker',
    'homeslider',
    'gallery',
    'polaroid'
);

// --------------------------------------- Default Gulp Task
// Define default task that can be called by just running `gulp` from cli
exports.default = build;

// ---------------------------------------------- gulp build
// vendors - task which moves and operates on node_modules
// and bower_components dependencies
// moveDist: moves dist folder to another location
// on the file system (useful for multiple repos e.g. gh-pages)
// gulp.task('build', gulp.series('clean',
//     gulp.parallel('scripts', 'styles', 'html'), 'vendors', 'moveDist')
// );


// =========================================================
// Basic example of gulp multifile tasks folder structure
// =========================================================
// **** Project-Directory/
// ------ gulpfile.js
// ****** src/
// ****** dist/
// ****** gulp/
// -------- config.js
// ******** tasks/
// ******** utils/
// ----------- newTaskTemplate.js
