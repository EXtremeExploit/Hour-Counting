const Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var count = 0;

setInterval(() => {
    count = 1;
    TweetNew();
}, 3600000);

function TweetNew() {
    client.post('statuses/update', {
        status: getNewNumber()
    }, function (error, tweet, response) {
        if (error) throw error;
    });
}

function getNewNumber() {
    return count;
}
