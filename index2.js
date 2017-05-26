'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'F1V3cS8uSreEkevMMvJRfyxWkwyiJW4BVu4u1A71MHamNKmrYnoGgXTT6of2KVvaQwz4AUp8TNAjhtm8lk4789p6pO3F9R8Q1/IaTudK4fOr1iSN9+rT5UPBiebaSa0+y4GuJJMpPMZy1M0/QEPOUAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd17971d3023f7c21091f242027dd893b'
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

app.listen(process.env.PORT);
//app.listen(4000);