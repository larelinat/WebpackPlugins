const pluginName = 'ConsolerPlugin';
const fs = require('fs');

class ConsolerPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ConsolerPlugin', (compilation, callback) => {
            const entrypoints = {
                entry: {
                    js: [],
                    css: []
                },
                publicPath: compilation.outputOptions.publicPath,
                version: new Date().getTime()
            }
            compilation.entrypoints.forEach((entry) => {
                entry._entrypointChunk.files.forEach((file) => {
                    if(file.match(/\.css$/)){
                        entrypoints.entry.css.push(file);
                    }
                    else if(file.match(/\.js$/)){
                        entrypoints.entry.js.push(file);
                    }
                })
            })
            fs.writeFile(this.options.fileName, JSON.stringify(entrypoints), () => {});
            callback();
        })
    }
}

module.exports = ConsolerPlugin;