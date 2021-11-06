const h = require('./fs-helpers.js');
const buildAssets = require('./build-helpers');

const config = require('../config');

require('esbuild').build({
    entryPoints: h.getFilesInDirectory('./src/js/pages').paths.filter(fn => fn.endsWith('.js')),
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    outdir: config.js.outDir,
    sourcemap: true,
});

buildAssets();