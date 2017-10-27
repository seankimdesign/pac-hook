const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { messageHandler, responseHandler } = require('./handlers')

app.use(bodyParser.json())

app.use('/', express.static('public'))

app.post('/message', messageHandler)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
