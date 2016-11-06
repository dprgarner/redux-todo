var path = require('path');

var _ = require('lodash');
var webpack = require('webpack');

var baseConfig = {
  entry: {
    app: ['./src/start.js'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'frontend.bundle.js',
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
      React: 'react',
    }),
  ],
};

exports.devServer = function (port) {
  var entry = JSON.parse(JSON.stringify(baseConfig.entry));
  entry.app.unshift(
    'webpack-dev-server/client?http://localhost:' + port + '/'
  );
  return _.extend({}, baseConfig, {
    entry: entry,
    devServer: {
      inline: true,
    },
  });
};

exports.test = function () {
  return _.extend({}, baseConfig, {
    externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
  });
};