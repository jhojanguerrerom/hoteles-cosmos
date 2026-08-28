const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const fs = require("fs");

const blocksPath = path.resolve(__dirname, "blocks");

const entries = {};

if (fs.existsSync(blocksPath)) {

    const blocks = fs.readdirSync(blocksPath, {
        withFileTypes: true
    });

    blocks.forEach((block) => {

        if (!block.isDirectory()) {
            return;
        }

        const editorPath = path.join(
            blocksPath,
            block.name,
            "editor.js"
        );

        if (!fs.existsSync(editorPath)) {
            return;
        }

        entries[block.name] = editorPath;
    });

}

module.exports = {
    ...defaultConfig,

    entry: entries,

    output: {
        ...defaultConfig.output,

        path: path.resolve(
            __dirname,
            "blocks"
        ),

        filename: "[name]/build/editor.js",

        clean: false
    }
};