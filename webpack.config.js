const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry : {
        'css/hello.week': './src/styles/hello-week.scss',
        'css/hello.week.theme': './src/styles/theme.scss',
        'hello.week': './src/core/hello-week.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].min.js',
        publicPath: '/dist',
        libraryTarget: 'var'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../dist/[name].min.css",
        })
    ]
};
