const path = require("path");
const webpack = require("webpack");

const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./home.html",
    filename: "./home.html",
});

const htmlPlugin2 = new HtmlWebPackPlugin({
    template: "./main.html",
    filename: "./index.html",
});

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            // utilities: path.resolve(srcPath, "utilities"),
            // components: path.resolve(srcPath, "components"),
            // api: path.resolve(srcPath, "api"),
            api: path.resolve(srcPath, "api"),
        },
    },
    entry: {
        index: ["./index.jsx", "./js/index.js"],
    },
    output: {
        path: distPath,
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        modules: false,
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-object-rest-spread",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 7070,
    },
    devtool: "cheap-source-map",
    plugins: [htmlPlugin, htmlPlugin2],
    watchOptions: {
        ignored: /node_modules/,
    },
};
