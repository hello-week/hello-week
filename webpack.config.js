const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
                use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        sourceMap: true,
                        importLoader: 2
                    }
                },
                "sass-loader"
                ]}
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
