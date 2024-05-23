const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const fsextra = require('fs-extra');

// Paths for the images
const paths = {
    src: '../vendor/imgs/**/*.{jpg,jpeg,png}',
    dest: './tmp'
};

// Class to handle image processing tasks
class ImageProcessor {
    constructor(srcPath, destPath) {
        this.srcPath = srcPath;
        this.destPath = destPath;
    }

    // Ensure destination folder exists or create it
    async ensureDestFolderExists() {
        try {
            await fsextra.ensureDir(this.destPath);
            console.log(`Destination folder '${this.destPath}' successfully created or already exists.`);
        } catch (err) {
            console.error(`Error while creating destination folder '${this.destPath}':`, err);
        }
    }

    // Optimize images using imagemin plugins
    async optimizeImages() {
        // Dynamically import imagemin and its plugins
        const debug = (await import('gulp-debug')).default;
        const newer = (await import('gulp-newer')).default;
        const imagemin = (await import('gulp-imagemin')).default;
        const mozjpeg = (await import('imagemin-mozjpeg')).default;
        const optipng = (await import('imagemin-optipng')).default;

        console.log('Starting copyImages task');
        // Optimize images and save them to destination folder
        return gulp.src(this.srcPath, { since: gulp.lastRun(this.optimizeImages) })
            .pipe(newer(this.destPath)) // Only copy newer files
            .pipe(imagemin([
                mozjpeg(), // MozJPEG plugin for JPEG optimization
                optipng()  // OptiPNG plugin for PNG optimization
            ]))
            .pipe(debug({ title: 'Copying image:' })) // Log the file being copied
            .pipe(gulp.dest(this.destPath))
            .on('end', () => {
                console.log('copyImages task completed successfully');
            })
            .on('error', (err) => {
                console.error('Error in copyImages task:', err);
            });
    }

    // Clean destination folder
    async cleanDestFolder() {
        try {
            await fsextra.emptyDir(this.destPath);
            console.log(`Destination folder '${this.destPath}' successfully cleaned.`);
        } catch (err) {
            console.error(`Error while cleaning destination folder '${this.destPath}':`, err);
        }
    }
}
// Create an instance of ImageProcessor with source and destination paths
const imageProcessor = new ImageProcessor(paths.src, paths.dest);

const srcFolder = '../vendor/imgs'; // Ordner, der durchsucht werden soll
const outputFolder = '../applications/frontend_vue/src/store/jsons'; // Ordner für die Ausgabedateien
function generateJSON(cb) {
    function processFolder(folder) {
        const subfolders = fs.readdirSync(folder).filter(subfolder =>
            fs.statSync(path.join(folder, subfolder)).isDirectory()
        );

        subfolders.forEach(subfolder => {
            const subfolderPath = path.join(folder, subfolder);
            const baseURL = `/imgs/${subfolder}`;
            const outputData = { data: [] };
            const imageGroups = {};

            const files = fs.readdirSync(subfolderPath);

            files.forEach(file => {
                const filePath = path.join(subfolderPath, file);
                const baseName = file.replace(/-(lg|md|sm|thumb|lazy)-min\.jpg$/, '-min.jpg');
                const key = determineKey(file);

                if (!imageGroups[baseName]) {
                    imageGroups[baseName] = {
                        url: `${baseURL}/${baseName}`,
                        lg: '',
                        md: '',
                        sm: '',
                        thumb: '',
                        lazy: ''
                    };
                }

                if (key) {
                    imageGroups[baseName][key] = `${baseURL}/${file}`;
                }
            });

            const images = Object.values(imageGroups);
            images.forEach(image => fillMissingValues(image));
            outputData.data.push(...images);

            const outputFilePath = path.join(outputFolder, `${subfolder}.json`);
            fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
        });
    }

    function determineKey(fileName) {
        if (fileName.includes('thumb-min')) return 'thumb';
        if (fileName.includes('lg-min')) return 'lg';
        if (fileName.includes('md-min')) return 'md';
        if (fileName.includes('sm-min')) return 'sm';
        if (fileName.includes('lazy-min')) return 'lazy';
        return '';
    }

    function fillMissingValues(image) {
        const keys = ['url', 'lg', 'md', 'sm', 'thumb', 'lazy'];
        let lastValue = '';

        for (const key of keys) {
            if (!image[key]) {
                image[key] = lastValue;
            } else {
                lastValue = image[key];
            }
        }
    }

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    processFolder(srcFolder);
    cb();
}

// Define Gulp tasks
gulp.task('optimizeImages', imageProcessor.optimizeImages.bind(imageProcessor));
gulp.task('cleanDestFolder', imageProcessor.cleanDestFolder.bind(imageProcessor));
gulp.task('ensureDestFolderExists', imageProcessor.ensureDestFolderExists.bind(imageProcessor));

// task: clean destination folder, ensure it exists, and then optimize images
gulp.task('optimize', gulp.series('cleanDestFolder', 'ensureDestFolderExists', 'optimizeImages'));

gulp.task('default', generateJSON);
