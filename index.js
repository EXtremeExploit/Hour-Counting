console.log('Starting...');
const Twitter = require('twit');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var count = 0;

TweetNew();

setInterval(() => {
    count = count + 1;
    TweetNew();
}, 3600000);

function TweetNew() {
    client.post('statuses/update', {
        status: getNewNumber(),
    }, function (error, tweet, response) {
        if (error) {
            console.error(error.message);
            console.error(error.name);
            return;
        } else {
            console.log('Tweeted ' + getNewNumber());
        }
    });
}

function getNewNumber() {
    return count.toString();
}
console.log('Started!');
