const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: '[name].bundle.js'
    },
    optimization: {
        runtimeChunk: 'single'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: /node_modules/,
                use: ['react-hot-loader/webpack']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: __dirname + '/public/index.html'
    })]
}