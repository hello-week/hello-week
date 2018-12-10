const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "../dist/[name].min.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry : {
        'css/hello.week': './src/styles/hello-week.scss',
        'css/hello.week.theme': './src/styles/theme.scss',
        'hello.week': './src/scripts/hello-week.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].min.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract([ 'css-loader', 'sass-loader' ])
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js']
    },
    plugins: [
        extractSass
    ]
};
