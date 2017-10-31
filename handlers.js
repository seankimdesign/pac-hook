const fetch = require('node-fetch')

const webhooksURL = require('./url')
const APP_CONST = require('./constants')
const { isPayload } = require('./formatters')

const messageBuffer = 600

const messageHandler = (req, res) => {
  console.log(req.domain)
  console.log(req.url)
  console.log(req.get('host'))
  console.log(req.socket.remoteAddress)
  const bodyContent = req.body
  if (isPayload(bodyContent)) {
    setTimeout(() => fetch(webhooksURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyContent)
    }).then((serverRes) => serverRes.text())
      .then((serverRes) => {
        if (serverRes === 'ok'){
          res.json({result: APP_CONST.code_success})
        } else {
          res.json({result: APP_CONST.code_server_rejected, message: serverRes})
        }
      }), messageBuffer)
  } else {
    res.json({result: APP_CONST.code_invalid_request})
  }
}
exports.messageHandler = messageHandler
