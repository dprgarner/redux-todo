var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
    app: ["./src/start.js"],
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: 'frontend.bundle.js',
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
          presets: ['react', 'es2015', 'stage-2']
        },
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};