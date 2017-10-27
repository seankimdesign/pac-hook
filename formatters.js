const { isIcon } = require('./validators')

const assemblePayload = (username, channel, img, text) => {
  const payload = {
    username,
    channel,
    text
  }
  if (isIcon(img)) {
    payload.icon_emoji = img
  } else {
    payload.icon_url = img
  }
  return payload
}
exports.assemblePayload = assemblePayload
