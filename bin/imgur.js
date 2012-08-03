#! /usr/local/bin/node

var http = require('http');
var fs = require('fs');
var qs = require('querystring');

function copy(str) {
  var clipboard = require('child_process').spawn('pbcopy').stdin;
  clipboard.write(str);
  clipboard.end();

  process.stdout.write('\nimgur link copied to clipboard!\n');
}

function upload(imgData) {

  var post_data = qs.stringify({
    'key': 'f29daac16ef710bba20406c80c23c9cf',
    'image': imgData
  });

  var post_options = {
    host: 'api.imgur.com',
    port: '80',
    path: '/2/upload.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  };

  var req = http.request(post_options, function(res) {

    var data = "";

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      process.stdout.write('done.\n');
      var link = JSON.parse(data).upload.links.original;
      copy(link);
    });

  });

  req.write(post_data);
  req.end();
}

process.stdout.write('Uploading image... ');

var image = fs.readFileSync(process.argv[2]);
upload(image.toString('base64'));