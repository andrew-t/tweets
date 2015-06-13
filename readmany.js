var fs = require('fs');
module.exports = function(files, parser, callback, errorCallback) {
	files.forEach(function(f, i) {
		fs.readFile(f, function(error, data) {
			files[i] = {
				error: error,
				data: data.toString()
			};
			if (files.reduce(function(a, b) { return a && typeof b != 'string'; }, true)) {
				var error = files.reduce(function(a, b) { return a || b.error; }, false);
				if (!error)
					callback.apply(this, files.map(function(f) {
						return parser ? parser(f.data) : f.data;
					}));
				else if (errorCallback)
					errorCallback.apply(this, files.map(function(f) {
						return f.data;
					}));
				else throw error;
			}
		});
	});
};