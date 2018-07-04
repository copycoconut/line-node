const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text 
	let type_ms = req.body.events[0].message.type
	let user_id = req.body.events[0].source.userId
	//ส่วนตรวจสอบข้อมูล
	console.log('type = ' + type_ms);
	console.log('ข้อความ = ' + msg);
	console.log('reply_token = ' + reply_token);
	console.log('user_id = ' + user_id);
	//ส่วนตอบกลับข้อมูล
    reply(reply_token, msg)
    res.sendStatus(200)
})


app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {ZzICmf3a+3pzLFcO4ZiwgpBdC2FQL361gFeR+fRqCTb95JZziCXvF8U86NqiHroq2V74cXqHDJ2j0U3z06OUPHfOuMTf8zWtm8qv55Gpv6NAr5s60Ys8n33IWtJftHsihKDPWgJaSNEyXVTroa46/gdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
		
    });
}