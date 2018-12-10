const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    node: {
        fs: 'empty'
    },
    entry: './demos/src/main.js',
    output: {
        path: path.resolve(__dirname, 'scripts/'),
        filename: '[name].min.js',
        publicPath: '/src'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['vue-style-loader','css-loader','sass-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}
