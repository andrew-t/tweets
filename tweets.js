var read = require('./readMany');

module.exports = function(callback) {
	read(['archive/data/js/payload_details.js',
		'archive/data/js/tweet_index.js',
		'archive/data/js/user_details.js'],
		parse,
		function(payload, index, user) {
			read(index.map(function(i) {
					return 'archive/' + i.file_name;
				}),
				parse,
				function() {
					var tweets = [];
					for (var i = 0; i < arguments.length; ++i)
						tweets = tweets.concat(arguments[i]);
					tweets.reverse();
					tweets.sort(function(a, b) {
						return new Date(a.created_at).getTime() -
							new Date(b.created_at).getTime();
					});
					callback(tweets, payload, user);
				});
		});
};

module.exports.url = function(tweet) {
	return 'https://twitter.com/' + tweet.user.screen_name +
		'/status/' + tweet.id_str;
};
module.exports.text = function(tweet) {
	return 'RT @' + tweet.retweeted_status.user.screen_name + ': ' +
		tweet.retweeted_status.text;
};

if (!module.parent)
	module.exports(function(tweets, payload, user) {
		console.log(tweets[tweets.length - 1]);
	});

function parse(data) {
	return JSON.parse(data.replace(/^[^=]*=/m, ''));
}