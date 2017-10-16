const _isValidString = (str) => {
  return typeof str === 'string' && str.length > 0
}
exports.isValidString = _isValidString

// Not really alphanumeric, since it allows periods, dashes, and underscores
const _isAlphanumeric = (str) => {
  return _isValidString(str) && /^[a-zA-Z0-9._/-]*$/.test(str.slice(1))
}
exports.isAlphanumeric = _isAlphanumeric

const _isHandle = (str) => {
  return _isAlphanumeric(str) &&  str.charAt(0) === '@'
}
exports.isHandle = _isHandle

const _isChannel = (str) => {
  return _isAlphanumeric(str) &&  str.charAt(0) === '#'
}
exports.isChannel = _isChannel

const _isValidTarget = (str) => {
  return _isHandle(str) || _isChannel(str)
}
exports.isValidTarget = _isValidTarget
