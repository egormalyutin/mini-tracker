const path = require("path")

module.exports = [
    (_, argv) => ({
        mode: argv.production ? "production" : "development",
        entry: "./src/index.ts",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader"
                }
            ]
        },
        devtool: "source-map",
        devServer: {
            contentBase: path.resolve(__dirname, "example"),
            writeToDisk: true
        },
        resolve: {
            modules: ["node_modules", "."],
            extensions: [".js", ".ts"]
        }
    })
]
