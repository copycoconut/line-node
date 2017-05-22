const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'F1V3cS8uSreEkevMMvJRfyxWkwyiJW4BVu4u1A71MHamNKmrYnoGgXTT6of2KVvaQwz4AUp8TNAjhtm8lk4789p6pO3F9R8Q1/IaTudK4fOr1iSN9+rT5UPBiebaSa0+y4GuJJMpPMZy1M0/QEPOUAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'https://api.line.me/v1/oauth/verify'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);