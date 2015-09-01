var path = require('path');
var Webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'server', 'build');
var indexPath = path.resolve(__dirname, 'app', 'index', 'entry.js');
var thsrcPath = path.resolve(__dirname, 'app', 'thsrc', 'entry.js');
var autoprefixer = require('autoprefixer-core');
var csswring     = require('csswring');
var eslintrcPath = path.resolve(__dirname, '.eslintrc');
module.exports = [
    {
        name: 'browser',
        entry: {
            index: [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080',
                indexPath
            ],
            thsrc: [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?http://localhost:8080',
                thsrcPath
            ]
        },
        output: {
            path: buildPath,
            filename: '[name].js'
        },
        module: {
            preLoaders: [
                {
                    test: /\.js(x)?$/,
                    loader: 'eslint',
                    exclude: nodeModulesPath
                }
            ],
            loaders: [
                { test: /\.js$/, loader: 'jsx-loader' },
                { test: /\.png$/, loader: 'url-loader' },
                { test: /\.jpg$/, loader: 'file-loader' },
                {   test: /\.(css|scss)$/,
                    loader: 'style!css!sass!postcss'
                },
                {
                    test : /\.(woff|woff2|ttf|eot|svg)$/,
                    loader: 'url'
                },
                {
                    test: /\.js(x)?$/,
                    loader: 'babel',
                    exclude: nodeModulesPath
                }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css', '.scss']
        },
        plugins: [
            new Webpack.HotModuleReplacementPlugin(),
            new Webpack.optimize.CommonsChunkPlugin('common.js')
        ],
        eslint: {
            configFile: eslintrcPath
        },
        postcss: function () {
            return [autoprefixer, csswring];
        }
    }
];
