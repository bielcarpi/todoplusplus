const config = require('../config');   // Require the config.js file

// Create an named instance in one file...
const bs = require("browser-sync").create('livereload-server');

// and call any methods on it.
bs.watch('./dist/*').on('change', bs.reload);

// Start the Browsersync server
bs.init({
    logLevel: "debug",
    proxy: {
        target: config.browserSync.proxy,
    },
    open: false
});