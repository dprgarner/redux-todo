const karmaConf = require('./karma.conf.js');

module.exports = function(config) {
  karmaConf(config);
  config.set({
    autoWatch: true,
    singleRun: false,
  });
};