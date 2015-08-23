var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var sassDependencies = [
    require('node-bourbon').includePaths,
    require('node-neat').includePaths
].reduce(function(prev, cur) {
    return prev.concat(cur);
}).map(function(path) {
    return 'includePaths[]=' + path;
}).join('&');

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
            loaders: [
                {
                    test: /\.png$/,
                    include: path.join(__dirname, 'assets'),
                    loader: 'file'
                },
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'src'),
                    loaders: ['react-hot', 'babel']
                },
                {
                    test: /\.css$/,
                    loader: 'style!css'
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'src'),
                    loader: 'style!raw!sass?' + sassDependencies
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url?limit=10000&minetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file'
                }
            ]
        },
        plugins: plugins,
        resolve: {
            root: path.resolve('./'),
            extensions: ['', '.js', '.jsx']
        }
    };
};