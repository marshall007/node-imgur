#! /usr/local/bin/node

var imgur = require('../lib/imgur').createClient('f29daac16ef710bba20406c80c23c9cf');
var util = require('../lib/util');

process.stdout.write('Uploading... ');

imgur.upload(process.argv[2], function(e, response) {

  process.stdout.write('done. ');

  if (e) {
    process.stdout.write('An error occured :(\n');
  } else {
    util.copy(response.upload.links.original);
    process.stdout.write('\nImgur link copied to clipboard!\n');
  }

});