const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry : {
        datepicker: './src/scripts/datepicker.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].min.js',
        publicPath: '/dist'
    },

    devtool: "source-map",

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                loader: extractTextPlugin.extract('css!sass'),
                options: {
                    minimize: true
                }
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"],
        modules: ['src', 'node_modules']
    },

    plugins: [
        new extractTextPlugin('../dist/[name].css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new UglifyJsPlugin()
    ],
};
