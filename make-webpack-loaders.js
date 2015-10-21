var path = require('path');

var sassDependencies = [
    require('node-bourbon').includePaths,
    require('node-neat').includePaths
].reduce(function(prev, cur) {
    return prev.concat(cur);
}).map(function(path) {
    return 'includePaths[]=' + path;
}).join('&');

module.exports = function(config) {
    return [{
        test: /\.png$/,
        include: path.join(__dirname, 'assets'),
        loader: 'file'
    }, {
        test: /\.js$/,
        include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'test')
        ],
        loaders: (config.hot ? ['react-hot'] : []).concat('babel')
    }, {
        test: /\.css$/,
        loader: 'style!css'
    }, {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        loader: 'style!raw!sass?' + sassDependencies
    }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
    }];
};
