let path = require('path');


let webpackConfig = {
    mode: 'development',
    entry: {
        funnel: './src/visualizations/funnel.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: 'css-loader' },
           
        ],
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        allowedHosts: ['.looker.com'],
        compress: true,
        port: 3443,
        https: true
    },
    devtool: 'eval'
};

module.exports = webpackConfig;
