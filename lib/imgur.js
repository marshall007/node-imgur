var request = require('request');
var fs = require('fs');
var util = require('./util');

var api_url = 'http://api.imgur.com/2/';

var request = request.defaults({
  json: true
});

function Imgur(key) {
  this.key = key;
}

Imgur.prototype = {

  constructor: Imgur

, upload: function(img_path, callback) {

    var req_opts = {
      uri: api_url + 'upload.json',
      qs: { key: this.key }
    }

    if (img_path.match(/^http:\/\//i)) {

      req_opts.qs.type = 'url';
      req_opts.qs.image = img_path;

      request.post(req_opts, function(e, r, body) {

        if (e || r.statusCode !== 200) {
          callback(e);
        } else {
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

            if (e || r.statusCode !== 200) {
              callback(e);
            } else {
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
