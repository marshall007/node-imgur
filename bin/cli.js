#! /usr/local/bin/node

var imgur = require('../lib/imgur').createClient('f29daac16ef710bba20406c80c23c9cf');
var util = require('../lib/util');
var docopt = require('../lib/docopt').docopt;

var doc = "\
\n\
Usage:\n\
  imgur [options] <image> [<image>...]\n\
  imgur -h | --help\n\
  imgur --version\n\
\n\
Options:\n\
  -p --print    Print Imgur link instead of copying to clipboard, default for multiple uploads.\n\
  -h --help     Show this screen.\n\
  --version     Show version.\n\
\n\
" + imgur.name + "@" + imgur.version;

// TODO
//    -s --step     Step over each image, pausing for confirmation.

var options = docopt(doc, { version: imgur.version });

if (options['<image>'].length > 0) {

  for (i in options['<image>']) {
    imgur.upload(options['<image>'][i], handleUpload);
  }
  
}

function awaitUser(callback) {
  process.stdin.resume();
  util.print('(any key to continue):');

  process.stdin.once('data', function(data) {
    callback(data);
    process.exit();
  });
}

function handleUpload(e, response) {
  if (e) {
    util.println(e.message);
    return;
  }

  if (options['--print'] || options['<image>'].length !== 1) {
    // util.print('[' + (i|0)+1 + '/' + options['<image>'].length + '] ');
    util.println(response.upload.image.path + ' => ' + response.upload.links.original);
  } else {
    util.copy(response.upload.links.original);
    util.println('Imgur link copied to clipboard! ');
  } 
}