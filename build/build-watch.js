const watchAssetsEsbuildPlugin = require('./watch-assets-esbuild-plugin.js');
const h = require('./fs-helpers.js');

const config = require('../config');

require('esbuild').build({
    entryPoints: h.getFilesInDirectory('./src/js/pages').paths.filter(fn => fn.endsWith('.js')),
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    outdir: config.js.outDir,
    plugins: [watchAssetsEsbuildPlugin],
    sourcemap: true,
    watch: {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
        },
    },
}).catch(() => process.exit(1))