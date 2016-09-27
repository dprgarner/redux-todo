var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var open = require('open');

var config = require("./webpack.conf.js");
var port = 8080;

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: './build',
  stats: {colors: true}
});

server.listen(port);
open("http://localhost:" + port + '/webpack-dev-server/');