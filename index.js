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
        status: count
    }, function (error, tweet, response) {
        if (error) {
            console.error(error.message);
            console.error(error.name);
            return;
        } else {
            if (count >= 24) {
                ResetCount();
            }
            console.log('Tweeted: ' + count);
        }
    });
}

function ResetCount() {
    client.post('statuses/update', {
        status: 'The day has ended!, Starting again!'
    }).then((e) => {
        process.exit();
    });
    count = 0;
}

console.log('Started!');
