// basic vars
const path = require('path');
const webpack = require('webpack');

// additional plugins
//const { CleanWebPack } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
//const ImageMin = require('imagemin-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let isProduction = (process.env.NODE_ENV == 'production');

// module settings
module.exports = {
    // basic path to the project
    context: path.resolve(__dirname, 'src'),

    // entry points
    entry: {
        app: [
            './js/app.js',
            './scss/style.scss'
        ],
    },

    // path for bundles
    output: {
        filename: 'js/[name].js', 
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },

    // dev server conf
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },

    mode: (isProduction) ? 'production' : 'development',

    devtool: (isProduction) ? '' : 'inline-source-map',

    module: {
        rules: [
            //scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        },
                    ],
                    fallback: "style-loader",
                })
            },

            //Images
            {
                test:/\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ]
            }
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            Popper: ['popper.js', 'default']
        }),

        new ExtractTextPlugin("./css/styles.css"),

        // new CleanWebPack(),

        new CopyWebPackPlugin({
                patterns: [
                    { from: 'img', to: 'img' },
                ],
            }
        )
    ]
};

// PRODUCTION ONLY
if (isProduction) {
    module.exports.plugins.push(
        new UglifyJsPlugin({
            sourceMap: true,
        }),
    );  
}