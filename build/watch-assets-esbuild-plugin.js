const h = require('./fs-helpers');
const buildAssets = require('./build-helpers');


const watchAssetsEsbuildPlugin = {
    name: 'watch-assets-plugin',
    setup(build) {
        build.onLoad({filter: /.*/, }, async (args) => {

            // find html file paths
            let filesAndPaths = h.getFilesInDirectory('./src')
            let htmlFiles = filesAndPaths.paths.filter(fn => fn.endsWith('.html'));

            // find css file and folders paths
            let css = h.getFilesAndFoldersInDirectoryRecursively('./src/css');

            // find media file paths
            let media = h.getFilesAndFoldersInDirectoryRecursively('./src/media');

            return {
                watchFiles: htmlFiles.concat(media.files).concat(css.files),
                watchDirs: media.dirs.concat(css.dirs)
            }
        })

        build.onEnd(result => {
            buildAssets();
        })
    }
}

module.exports = watchAssetsEsbuildPlugin;