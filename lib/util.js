

exports.copy = function(str) {
  var clipboard = require('child_process').spawn('pbcopy').stdin;

  clipboard.write(str);
  clipboard.end();
};