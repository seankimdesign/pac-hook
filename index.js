const express = require('express')
const app = express()
const messageHandler = require('./messageHandler')

app.use('/', express.static('public'))

app.post('/message', messageHandler)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
