var webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/client/index.js"
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
    publicPath: "/"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: __dirname + "/src/client",
      loader: "react-hot!babel"
    }]
  }
};
