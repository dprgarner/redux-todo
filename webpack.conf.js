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
};