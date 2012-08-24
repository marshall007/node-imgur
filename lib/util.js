

exports.copy = function(str) {
  var clipboard = require('child_process').spawn('pbcopy').stdin;

  clipboard.write(str);
  clipboard.end();
};

exports.print = function(str) {
  process.stdout.write(str);
};

exports.println = function(str) {
  process.stdout.write(str+'\n');
};