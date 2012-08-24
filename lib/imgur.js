var util = require('./util');
var pkg = require('../package.json');

var request = require('request');
var fs = require('fs');

var api_url = 'http://api.imgur.com/2/';

var request = request.defaults({
  json: true
});

function Imgur(key) {
  this.key = key;
}

Imgur.prototype = {

  constructor: Imgur

, name: pkg.name
, version: pkg.version
, description: pkg.description

, upload: function(img_path, callback) {

    var req_opts = {
      uri: api_url + 'upload.json',
      qs: { key: this.key }
    }

    if (img_path.match(/^http:\/\//i)) {

      req_opts.qs.type = 'url';
      req_opts.qs.image = img_path;

      request.post(req_opts, function(e, r, body) {

        if (e) {
          callback(e);
        } else if (r.statusCode !== 200 || body.error) {
          callback(body.error);
        } else {
          body.upload.image.path = img_path;
          callback(null, body);
        }

      });

    } else {

      fs.readFile(img_path, function(e, img_data) {

        if (e) {
          callback(e);
        } else {

          req_opts.qs.type = 'base64';
          req_opts.body = img_data.toString('base64');

          request.post(req_opts, function(e, r, body) {

            if (e) {
              callback(e);
            } else if (r.statusCode !== 200 || body.error) {
              callback(body.error);
            } else {
              body.upload.image.path = img_path;
              callback(null, body);
            }

          });

        }

      });
    }
  }
}


exports.Imgur = Imgur;

exports.createClient = function(key) {
  var c = new Imgur(key);
  return c;
};
