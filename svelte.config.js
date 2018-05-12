const ts = require('typescript');
const tsconfig = require('tsconfig');

/**
 * This is used in the webpack config, and allows editor
 * plugins to deal use our settings and preprocessors when required.
 */

module.exports = {
    preprocess: {
        script: svelteTypescript(__dirname),
    },
};

function svelteTypescript(configDir) {
    return ({ content, attributes }) => {
        if (attributes.type !== 'text/typescript') {
            return;
        }

        const result = ts.transpileModule(content, {
            compilerOptions: getCompilerOptions(configDir),
        });
        return { code: result.outputText, map: result.sourceMapText };
    };
}

function getCompilerOptions(configDir) {
    let jsonCompilerOptions = {};
    try {
        const res = tsconfig.loadSync(configDir);
        jsonCompilerOptions = res.config.compilerOptions;
        configDir = path.dirname(res.path);
    } catch (err) {}

    jsonCompilerOptions = Object.assign({}, jsonCompilerOptions, {
        sourceMap: true,
        outDir: '__svelte__',
        allowJs: true,
    });

    return ts.convertCompilerOptionsFromJson(jsonCompilerOptions, configDir).options;
}
