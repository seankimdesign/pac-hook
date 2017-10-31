const fetch = require('node-fetch')

const webhooksURL = require('./url')
const APP_CONST = require('./constants')
const { isPayload } = require('./formatters')
const { writeLog } = require('./writer')

const messageBuffer = 600

const constructFileName = () => {
  const now = new Date()
  return now.getFullYear() + '-' + now.getMonth() + APP_CONST.log_ext
}

const constructLogMessage = (userIp, message, success) => {
  const now = new Date()
  return `[${now.toLocaleTimeString()}] ${userIp} :: ${message} :: ${success}\n`
}

const messageHandler = (req, res) => {
  console.log(req.socket.remoteAddress)
  const domain = req.get('host')
  const userIp = req.socket.remoteAddress
  const bodyContent = JSON.stringify(req.body)
  if (domain === APP_CONST.application_domain && isPayload(req.body)) {
    setTimeout(() => fetch(webhooksURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyContent
    }).then((serverRes) => serverRes.text())
      .then((serverRes) => {
        const logContent = constructLogMessage(userIp, bodyContent, serverRes)
        writeLog(constructFileName(), logContent)
          .then(() => {
            if (serverRes === 'ok'){
              res.json({result: APP_CONST.code_success})
            } else {
              res.json({result: APP_CONST.code_server_error, message: serverRes})
            }
          })
          .catch((err) => {
            console.log(err)
            res.json({result: APP_CONST.code_server_rejected, message: err.code})
          })
      }), messageBuffer)
  } else {
    const logContent = constructLogMessage(userIp, bodyContent, 'invalid_request')
    writeLog(constructFileName(), logContent).then(() => {
      res.json({result: APP_CONST.code_invalid_request, message: 'You\'re trying something fishy there, eh?'})
    })
    .catch((err) => {
      console.log(err)
      res.json({result: APP_CONST.code_server_error, message: err})
    })
  }
}
exports.messageHandler = messageHandler
