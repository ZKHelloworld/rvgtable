const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'RVGTable': './src/index.js',
        'demo': './demo/index.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] }
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]'
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
