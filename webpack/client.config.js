const webpack = require('webpack');
const config = require('sapper/webpack/config.js');
const { CheckerPlugin } = require('awesome-typescript-loader');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.json', '.ts', '.html']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: Object.assign({}, require('../svelte.config'), {
						hydratable: true,
						hotReload: true,
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
	mode,
	plugins: [
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
		new CheckerPlugin(),
	].filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
