console.log('Starting...');
const Twitter = require('twit');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var d = new Date();
Tweet();
setInterval(() => {
    d = new Date();
    if ((d.getUTCMinutes() == '00') && (d.getUTCSeconds() == '00')) {
        Tweet();
    }

}, 500);

function Tweet() {
    client.post('statuses/update', {
        status: new Date().getUTCHours()
    }, (error, tweet, response) => {
        if (error) {
            console.error(error.message);
            return;
        } else {
            if (d.getUTCHours() == 00) {
                ResetCount();
            }
            console.log('Tweeted: ' + d.getUTCHours());
        }
    });
}

function ResetCount() {
    client.post('statuses/update', {
        status: 'The day has ended!, Starting again!'
    }).then((e) => {
        process.exit();
    });
}

console.log('Started!');
