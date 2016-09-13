import fs from 'fs';
import path from 'path';

import webpack from 'webpack';

import env from './env.js';
import { cssExtractLoaders } from './util.js';

const rootPath = path.join(__dirname, '../');

let webpackConfig =  {
	entry: {
		app: path.join(rootPath, './static/app.js')
	},
	output: {
		path: path.join(rootPath, './template/render'),
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.scss'],
		alias: {

		}
	},
	target: 'electron-renderer',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		})
	],
	vue: {
		loaders: cssExtractLoaders()
	}
};

if (env === 'dev') {
	webpackConfig.watch = true;
	webpackConfig.devtool = '#eval-source-map';
}

if (env === 'production') {
	webpackConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}));
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));
}

export default webpackConfig;
