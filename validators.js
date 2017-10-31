const isValidString = (str) => typeof str === 'string' && str.trim().length > 0
exports.isValidString = isValidString

// Not really alphanumeric, since it allows periods, dashes, and underscores
const isAlphanumeric = (str) => isValidString(str) && /^[a-zA-Z0-9._/-]*$/.test(str.slice(1))
exports.isAlphanumeric = isAlphanumeric

const isHandle = (str) => isAlphanumeric(str) && str.charAt(0) === '@'
exports.isHandle = isHandle

const isChannel = (str) => isAlphanumeric(str) && str.charAt(0) === '#'
exports.isChannel = isChannel

const isValidTarget = (str) => isHandle(str) || isChannel(str)
exports.isValidTarget = isValidTarget

const isIcon = (src) => src.charAt(0) === ':' && src.slice(-1) === ':'
exports.isIcon = isIcon

const isImage = (src) => src.length > 8
exports.isImage = isImage

const allValid = (validationArr) => validationArr.every((input) => input.validated)
exports.allValid = allValid
