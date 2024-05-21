const gulp = require('gulp');
const fs = require('fs-extra');

// Class to handle image processing tasks
class ImageProcessor {
    constructor(srcPath, destPath) {
        this.srcPath = srcPath;
        this.destPath = destPath;
    }

    // Ensure destination folder exists or create it
    async ensureDestFolderExists() {
        try {
            await fs.ensureDir(this.destPath);
            console.log(`Destination folder '${this.destPath}' successfully created or already exists.`);
        } catch (err) {
            console.error(`Error while creating destination folder '${this.destPath}':`, err);
        }
    }

    // Optimize images using imagemin plugins
    async optimizeImages() {
        // Dynamically import imagemin and its plugins
        const imagemin = (await import('gulp-imagemin')).default;
        const mozjpeg = (await import('imagemin-mozjpeg')).default;
        const optipng = (await import('imagemin-optipng')).default;

        // Optimize images and save them to destination folder
        return gulp.src(this.srcPath)
            .pipe(imagemin([
                mozjpeg(), // MozJPEG plugin for JPEG optimization
                optipng()  // OptiPNG plugin for PNG optimization
            ]))
            .pipe(gulp.dest(this.destPath));
    }

    // Clean destination folder
    async cleanDestFolder() {
        try {
            await fs.emptyDir(this.destPath);
            console.log(`Destination folder '${this.destPath}' successfully cleaned.`);
        } catch (err) {
            console.error(`Error while cleaning destination folder '${this.destPath}':`, err);
        }
    }
}

// Paths for the images
const paths = {
    src: '../vendor/imgs/**/*.{jpg,jpeg,png}',
    dest: '../applications/frontend_vue/src/assets/imgs'
};

// Create an instance of ImageProcessor with source and destination paths
const imageProcessor = new ImageProcessor(paths.src, paths.dest);

// Define Gulp tasks
gulp.task('optimizeImages', imageProcessor.optimizeImages.bind(imageProcessor));
gulp.task('cleanDestFolder', imageProcessor.cleanDestFolder.bind(imageProcessor));
gulp.task('ensureDestFolderExists', imageProcessor.ensureDestFolderExists.bind(imageProcessor));

// Default task: clean destination folder, ensure it exists, and then optimize images
gulp.task('default', gulp.series('cleanDestFolder', 'ensureDestFolderExists', 'optimizeImages'));
