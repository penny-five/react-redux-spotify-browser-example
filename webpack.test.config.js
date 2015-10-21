var path = require('path');
var glob = require('glob');
var loaders = require('./make-webpack-loaders')({ hot: false });

module.exports = (function() {
    return {
        target: 'node',
        devtool: 'eval',
        entry: glob.sync('./test/**/!(init).js').map(function(file) {
            return 'babel!' + file;
        }),
        output: {
            path: path.join(__dirname, '.test'),
            filename: 'test.bundle.js'
        },
        module: {
            loaders: loaders
        },
        resolve: {
            root: path.resolve('./'),
            extensions: ['', '.js', '.jsx']
        }
    };
})();