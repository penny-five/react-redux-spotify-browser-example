var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

var host = 'localhost';
var port = 3000;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    hot: true,
    historyApiFallback: true,
    noInfo: true
}).listen(port, host, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at ' + host + ':' + port);
});