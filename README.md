node-imgur
==========

A CLI tool and wrapper for the Imgur API.

### Command Line

If you intend to use the command line tool, it's best to install the package globally with `npm install -g node-imgur`.

See `imgur --help` for a list of options.


### Simple Example Usage

````javascript

var imgur = require('node-imgur').createClient('ANONYMOUS_API_KEY');

imgur.upload("path/to/file.png", function(error, data) {
  // do fun stuff
});

````