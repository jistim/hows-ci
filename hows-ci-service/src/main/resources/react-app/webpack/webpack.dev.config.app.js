var path = require('path');
var webpack = require('webpack');


module.exports = {
    //
    entry: {
        app: './webpack/app.js'
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
        publicPath: '/js/',
        filename: '[name]-bundle.js'
    },
    watch: true,
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, '..', '..', 'static'),
        port: 18090,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8090',
                secure: false
            },
            '/credential': {
                target: 'http://localhost:8090',
                secure: false
            },
            '/resources': {
                target: 'http://localhost:8090',
                secure: false
            }
        }
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
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-react-es2015'],
                    compact: false
                }
            }
        ]
    },
    externals : {
        'jquery': 'var pavExternalLib.jQuery',
        'react': 'var pavExternalLib.React',
        'react-dom': 'var pavExternalLib.ReactDOM',
        'react-router': 'var pavExternalLib.ReactRouter',
        'react-bootstrap': 'var pavExternalLib.ReactBootstrap'
    }
};