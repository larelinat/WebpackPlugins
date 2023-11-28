const pluginName = 'ConsolerPlugin';


class ConsolerPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap(pluginName, (stats) => {
            console.log('Hello from ConsolerPlugin');
        });
    }
}

module.exports = ConsolerPlugin;