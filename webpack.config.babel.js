import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: './app.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'url-loader?limit=10000',
					'img-loader'
				]
			}
		]
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},

	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},

	plugins: [
		new ExtractTextPlugin("style.css"),
	]
};