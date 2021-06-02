// =========================================================
// Project: PROJECT-NAME
// =========================================================
// ------------------------------------------ Export Configs
module.exports = {
    production: false, // use to programmatically operate on
    // gulp tasks based on environment
// ------------------------------------------------- images
    images: {
        bandmembers: {
            src: 'vendor/images/bandmembers/**/*.jpg',
            dest: 'public/img/bandmembers/'
        },
        breaker: {
            src: 'vendor/images/breakerimage/**/*.jpg',
            dest: 'public/img/breakerimage/'
        },
        gallery: {
            src: 'vendor/images/gallery/**/*.jpg',
            dest: 'public/img/gallery/',
        },
        homeslider: {
            src: 'vendor/images/homeslider/**/*.jpg',
            dest: 'public/img/homeslider/'
        },
        polaroid: {
            src: 'vendor/images/polaroid/**/*.jpg',
            dest: 'public/img/polaroid/'
        },
    }
}
