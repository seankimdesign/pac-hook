const isIcon = (src) => {
  return src.charAt(0) === ':' && src.slice(-1) === ':'
}
exports.isIcon = isIcon

const assemblePayload = (name, destination, img, message) => {
  const payload = {
    name,
    destination,
    message
  }
  if (isIcon(img)){
    payload.image = {icon: img}
  } else {
    payload.image = {src: img}
  }
  return payload
}
exports.assemblePayload = assemblePayload
