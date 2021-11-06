const fs = require("fs");
const fsExtra = require("fs-extra");
const h = require("./fs-helpers");

const {minify: htmlMinify} = require("html-minifier");
const CleanCss = require("clean-css");

const config = require('../config');

function buildHtml() {
    // Minify HTML
    let htmlFilesAndPaths = h.getFilesInDirectory('./src')
    let htmlFiles = htmlFilesAndPaths.files.filter(fn => fn.endsWith('.html'));
    let htmlPaths = htmlFilesAndPaths.paths.filter(fn => fn.endsWith('.html'));

    // copy html files
    h.zip(htmlFiles, htmlPaths).forEach(e =>
        fs.readFile(e[1], (err, data) => {
            const fileContents = htmlMinify(data.toString(), config.html.htmlMinifyOptions);
            fs.writeFile(`${config.html.outDir}/${e[0]}`, fileContents, (err) => err !== null ? console.log(err) : null);
        }));
}

function buildCss() {
    let filesAndPaths = h.getFilesAndFoldersInDirectoryRecursively('./src/css');
    let cssFiles = filesAndPaths.files.filter(fn => fn.endsWith('.css'));
    const css = cssFiles.reduce((buffer, file) => {
            const data = fs.readFileSync(file);
            return Buffer.concat([buffer, data]);
        }
        , Buffer.from(''));

    const minifiedCss = new CleanCss().minify(css.toString());
    if (!fs.existsSync(config.css.outDir)) {
        fs.mkdirSync(config.css.outDir);
    }
    fs.writeFile(`${config.css.outDir}/styles.css`, minifiedCss.styles, (err) => err !== null ? console.log(err) : null);
}

function buildMedia() {
    fsExtra.copy('./src/media', './dist/media');
}

function buildAssets() {
    // Minify HTML
    buildHtml();

    // Minify CSS
    buildCss();

    // Copy Media directory
    buildMedia();
}

module.exports = buildAssets;