#!/usr/bin/env node

var t = require('./tweets');

t(function(tweets, payload, user) {
	var key = process.argv[2].toLowerCase();
	tweets.forEach(function(tweet) {
		if (~tweet.text.toLowerCase().indexOf(key)) {
			console.log('\033[2m' + tweet.created_at + ' @ ' +
				t.url(tweet) + '\033[0m');
			console.log(tweet.retweeted_status
				? '\033[33m' + t.text(tweet) + '\033[0m'
				: tweet.text);
		}
	});
});