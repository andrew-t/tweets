#!/usr/bin/env node

require('./tweets')(function(tweets, payload, user) {
	var key = process.argv[2].toLowerCase();
	tweets.forEach(function(tweet) {
		if (~tweet.text.toLowerCase().indexOf(key)) {
			console.log('\033[2m' + tweet.created_at + ':\033[0m');
			console.log(tweet.retweeted_status
				? '\033[33mRT: ' + tweet.retweeted_status.user.screen_name + ': ' +
					tweet.retweeted_status.text + '\033[0m'
				: tweet.text);
		}
	});
});