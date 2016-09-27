var path = require("path");

module.exports = {
  entry: {
    app: ["./src/index.js"],
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: 'frontend.bundle.js'
  },

  devServer: {
    inline: true,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ],
  },
};