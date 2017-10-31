const APP_CONST = require('./constants')

const hasClass = (elem, targetClass) => elem.className.split(' ').some((cls) => cls === targetClass)
exports.hasClass = hasClass

const addClass = (elem, targetClass) => elem.className += ' ' + targetClass
exports.addClass = addClass

const overwriteClass = (elem, targetClass) => elem.className = targetClass
exports.overwriteClass = overwriteClass

const removeClass = (elem, targetClass) => {
  elem.className = elem.className.split(' ')
    .filter((cls) => cls !== targetClass)
    .join(' ')
}
exports.removeClass = removeClass

const toggleClass = (elem, className, forceOff) => {
  if (typeof forceOff !== 'undefined') {
    removeClass(elem, className)
    if (forceOff === false) addClass(elem, className)
  } else if (hasClass(elem, className)) {
    removeClass(elem, className)
  } else {
    addClass(elem, className)
  }
}
exports.toggleClass = toggleClass
