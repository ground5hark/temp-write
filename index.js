'use strict';
var path = require('path');
var tmpdir = (function(os){
  if (os.tmpdir) {
    // 0.10.x
    return os.tmpdir();
  } else {
    // 0.8.x
    return os.tmpDir();
  }
}(require('os')));
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var uuid = require('uuid');

function tempfile(filepath) {
	return path.join(tmpdir, uuid.v4(), (filepath || ''));
}

module.exports = function (str, filepath, cb) {
	if (typeof filepath === 'function') {
		cb = filepath;
		filepath = null;
	}

	var fullpath = tempfile(filepath);

	mkdirp(path.dirname(fullpath), function (err) {
		fs.writeFile(fullpath, str, function (err) {
			cb(err, fullpath);
		});
	});
};

module.exports.sync = function (str, filepath) {
	var fullpath = tempfile(filepath);

	mkdirp.sync(path.dirname(fullpath));
	fs.writeFileSync(fullpath, str);

	return fullpath;
};
