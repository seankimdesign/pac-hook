const messageHandler = (req, res) => {
  console.log('POST received')
  console.log(Object.keys(req))
  console.log(req.body)
  res.json({message: 'alright'})
}
exports.messageHandler = messageHandler
