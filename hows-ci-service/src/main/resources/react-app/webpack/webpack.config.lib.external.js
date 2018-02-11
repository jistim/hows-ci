var path = require('path');
var webpack = require('webpack');


module.exports = {
    //
    entry: {
        'external-lib': './webpack/external-lib.js'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
        alias:  {
            'app' : path.join(__dirname, '..', 'src')
        }
    },
    output: {
        path: path.join(__dirname, '..', '..', 'static', 'js'),
        filename: '[name]-bundle.js',
        libraryTarget: 'window',
        library: 'pavExternalLib'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2015'],
                    compact: false
                }
            }
        ]
    }
};