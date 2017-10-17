const isValidString = (str) => typeof str === 'string' && str.length > 0
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