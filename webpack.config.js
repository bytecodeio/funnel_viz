let path = require('path');


let webpackConfig = {
    mode: 'development',
    entry: {
        funnel_icons: './src/visualizations/funnel_icons.js',
        funnel_smooth: './src/visualizations/funnel_smooth.js'
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
        server: 'https'
    },
    devtool: 'eval'
};

module.exports = webpackConfig;
