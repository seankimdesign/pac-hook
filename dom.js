const APP_CONST = require('./constants')

const hasClass = (elem, targetClass) => elem.className.split(' ').some((cls) => cls === targetClass)
exports.hasClass = hasClass

const addClass = (elem, targetClass) => elem.className += ' ' + targetClass
exports.addClass = addClass

const removeClass = (elem, targetClass) => {
  elem.className = elem.className.split(' ')
    .filter((cls) => cls !== targetClass)
    .join(' ')
}
exports.removeClass = removeClass

const toggleVisibility = (elem, visibility) => {
  if (typeof visibility !== 'undefined') {
    removeClass(elem, APP_CONST.invis)
    if (visibility === false) addClass(elem, APP_CONST.invis)
  } else if (hasClass(elem, APP_CONST.invis)) {
    removeClass(elem, APP_CONST.invis)
  } else {
    addClass(elem, APP_CONST.invis)
  }
}
exports.toggleVisibility = toggleVisibility
