const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const dev = process.env.NODE_ENV === 'development'

const includePaths = [path.resolve(__dirname, 'client')]

const excludePaths = [
	path.resolve(__dirname, 'node_modules'),
	path.resolve(__dirname, 'server'),
	path.resolve(__dirname, 'test'),
]

const configCommon = {
	entry: ['./client/index.js'],
	output: {
		path: path.join(__dirname, '/server/static/assets'),
		publicPath: '/assets',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: includePaths,
				exclude: excludePaths,
				loader: 'babel-loader',
				query: {
					presets: [
						[
							'env',
							{
								targets: {
									browsers: ['last 2 versions', '> 1%'],
								},
							},
						],
					],
					plugins: [require('babel-plugin-transform-object-rest-spread')],
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx', '.css'],
		modules: [path.resolve(__dirname, 'node_modules')],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
			},
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin({
			filename: 'main.css',
			disable: false,
			allChunks: true,
		}),
	],
	devServer: {
		contentBase: [
			path.join(__dirname, 'server/static'),
			path.join(__dirname, './'),
		],
		proxy: {
			'/api': 'http://localhost:3000',
		},
	},
}

const configProd = Object.assign({}, configCommon, {
	devtool: 'source-map',
	plugins: configCommon.plugins.concat(new UglifyJSPlugin()),
	module: {
		rules: configCommon.module.rules.concat({
			test: /\.css$/,
			include: includePaths,
			exclude: excludePaths,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: true,
						},
					},
				],
			}),
		}),
	},
})

const configDev = Object.assign({}, configCommon, {
	entry: ['./client/index.js'],
	devtool: 'cheap-eval-source-map',
	plugins: configCommon.plugins.concat(
		new webpack.HotModuleReplacementPlugin()
	),
	module: {
		rules: configCommon.module.rules.concat({
			test: /\.css$/,
			include: includePaths,
			exclude: excludePaths,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		}),
	},
})

const config = dev ? configDev : configProd

module.exports = config
