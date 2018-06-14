const config = require('sapper/webpack/config.js');
const pkg = require('../package.json');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.json', '.ts', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	externals: Object.keys(pkg.dependencies),
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'svelte-loader',
					options: Object.assign({}, require('../svelte.config'), {
						css: false,
						generate: 'ssr'
					})
				}
			},
            {
                test: /\.ts$/,
				exclude: /node_modules/,
                use: 'awesome-typescript-loader'
            }
		]
	},
	plugins: [new CheckerPlugin()],
	mode: process.env.NODE_ENV,
	performance: {
		hints: false // it doesn't matter if server.js is large
	}
};