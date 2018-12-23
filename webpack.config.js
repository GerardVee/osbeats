/* eslint-disable */
require('@babel/polyfill');
require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    mode: process.env.NODE_ENV,
    entry: [ '@babel/polyfill', path.join(__dirname, 'src/index.js') ],
    output: { path: __dirname, filename: production ? 'dist/bundle.min.js' : 'dist/bundle.js' },
    optimization: production ?  {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    } : {},
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API': JSON.stringify(process.env.API)
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: production ? 'dist/bundle.min.css' : '[name].css',
            chunkFilename: production ? 'dist/[id].min.css' : '[id].css'
        })
    ],
    module: {
        rules: [ {
            test: /.jsx?$/,
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            use:
            [
                !production ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ]
        }
        ]
    }
};