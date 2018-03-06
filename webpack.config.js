const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
        datepicker: './src/scripts/datepicker.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: '/dist'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            { // sass / scss loader for webpack
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractTextPlugin.extract({
                    use : ['css-loader', 'sass-loader']
                })
            },
        ],
        loaders: [
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: extractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: ['src', 'node_modules']
    },

    plugins: [
        new extractTextPlugin({ // define where to save the file
            filename: __dirname + "/dist/datepicker.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
};
