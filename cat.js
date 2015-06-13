#!/usr/bin/env node

require('./tweets')(function(tweets, payload, user) {
	var key = process.argv[2].toLowerCase();
	tweets.forEach(function(tweet) {
		console.log(tweet.text);
	});
});