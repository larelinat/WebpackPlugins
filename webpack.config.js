const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ConsolerPlugin = require("./wpplugins/consoler");
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.pug'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                },
                onEnd: {
                    copy: [
                        {
                            source: path.join('src', 'static'),
                            destination: 'dist'
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "index.[contenthash].css",
        }),
        new ConsolerPlugin({fileName: "result.js"}),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 3000,
    },
    entry: {
        app1: path.join(__dirname, 'src', 'index.js'),
        app2: path.join(__dirname, 'src', 'index2.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node-modules/,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash][ext]',
                },

            },
            {
                test: /\.pug$/,
                use: 'pug-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]'),
                }
            },
        ],
    },
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ['gifsicle', {interlaced: true}],
                                ['jpegtran', {progressive: true}],
                                ['optipng', {optimizationLevel: 5}],
                                ['svgo', {name: 'preset-default',}],
                            ]
                        }
                    }
                }
            ),
        ]
    }
};