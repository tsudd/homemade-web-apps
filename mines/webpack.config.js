// basic vars
const path = require('path');
const webpack = require('webpack');

// additional plugins
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// module settings
module.exports = {
    // basic path to the project
    context: path.resolve(__dirname, ''),

    // entry points
    entry: {
        app: [
            './pages/app.js',
            './pages/index.js'
        ],
    },

    // path for bundles
    output: {
        filename: 'js/[name].js', 
        path: path.resolve(__dirname, 'dist'),
    },

    // dev server conf
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },

    module: {
        rules: [
            //scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                      {
                        loader: 'css-loader?url=false',
                        options: { sourceMap: true }
                      },
                      {
                        loader: 'postcss-loader',
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
              test:/\.(png|gif|jpe?g)$/i,
              loaders: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'css',
                          publicPath: './',
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

        new HtmlWebpackPlugin({
          title: "Mines",
          template: "./pages/index.html",
        }),

        new CleanWebpackPlugin(),

        new CopyPlugin({
          patterns: [
            { from: './pages/assets/', to: 'assets' },
          ]
        }),
    ],
};

// // PRODUCTION ONLY
// if (isProduction) {
//     module.exports.plugins.push(
//         new UglifyJsPlugin({
//             sourceMap: true,
//         }),
//     );  
// }