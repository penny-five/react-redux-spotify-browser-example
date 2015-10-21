var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var loaders = require('./make-webpack-loaders')({ hot: true });

module.exports = function(opts) {

    var entry = [];

    if (opts.useDevServer) {
        entry.push('webpack-dev-server/client?http://localhost:3000');
        entry.push('webpack/hot/only-dev-server');
    }
    entry.push('font-awesome-webpack', './src/index.js');

    var plugins = [];

    if (opts.useDevServer) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.NoErrorsPlugin());
    }
    plugins.push(
        new webpack.DefinePlugin({
            __DEVTOOLS__: opts.useReduxDevTools || false
        }),
        new HtmlWebpackPlugin({
            template: './assets/index.html',
            inject: 'body',
            title: 'React Spotify Browser'
        })
    );

    return {
        devtool: opts.devtool || null,
        entry: entry,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[hash].bundle.js'
        },
        module: {
            loaders: loaders
        },
        plugins: plugins,
        resolve: {
            root: path.resolve('./'),
            extensions: ['', '.js', '.jsx']
        }
    };
};