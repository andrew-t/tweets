#!/usr/bin/env node

var Markov = require('./markov/markov');

require('./tweets')(function(tweets, payload, user) {
	var markov = new Markov(2);
	tweets.forEach(function(tweet) {
		if (!tweet.retweeted_status && /^[\w]/.test(tweet.text))
			markov.train(tweet.text);
	});
	for (var i = 0; i < (process.argv[2] || 50); ++i)
		console.log(markov.ramble());
});