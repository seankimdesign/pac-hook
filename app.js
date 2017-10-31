const APP_CONST = require('./constants')
const { isValidString, isIcon, isImage, isHandle, isChannel, allValid } = require('./validators')
const { assemblePayload } = require('./formatters')
const { toggleClass, overwriteClass } = require('./dom')

;(() => {
  const isGoodBrowser = typeof window.fetch === 'function' && typeof window.Headers === 'function'

  if (!isGoodBrowser) {
    toggleClass(document.getElementById('bad-browser'), APP_CONST.invis, true)
    return
  }

  const imageSelectElement = document.getElementById('image-type')
  const imageInputElement = document.getElementById('image')
  const submitButtonElement = document.getElementById('do-submit')
  const resetButtonElement = document.getElementById('do-reset')
  const globalNotification = document.getElementById('global-notification-box')
  const globalNotificationMessage = document.getElementById('global-notification-message')
  const globalNotificationClose = document.getElementById('close-global-notification')

  const getImageTypeSelectValue = () => imageSelectElement.value
  const defaultGetValidationFail = () => APP_CONST.invalid_elem

  const keyupEvent = new window.KeyboardEvent('keyup', {
    view: window,
    bubbles: true,
    cancelable: true
  })

  const inputTable = [
    {
      id: 'username',
      getInvalidClass: defaultGetValidationFail,
      validate: isValidString
    }, {
      id: 'channel',
      getInvalidClass: defaultGetValidationFail,
      validate: (value) => isHandle(value) || isChannel(value)
    }, {
      id: 'image',
      getInvalidClass: () => APP_CONST.invalid_elem +
        (getImageTypeSelectValue() === APP_CONST.icon ? APP_CONST.icon_suffix : APP_CONST.image_suffix),
      validate: (value) => {
        const onIcon = getImageTypeSelectValue() === APP_CONST.icon
        return isValidString(value) && (onIcon ? isIcon(value) : isImage(value))
      }
    }, {
      id: 'text',
      getInvalidClass: defaultGetValidationFail,
      validate: isValidString
    }
  ]

  const validationStatus = inputTable.map((input) => ({id: input.id, validated: false}))
  const updateValidation = (id, value) => {
    const input = validationStatus.find((input) => input.id === id)
    if (input) {
      input.validated = value
      submitButtonElement.setAttribute('disabled', true)
      if (allValid(validationStatus)) submitButtonElement.removeAttribute('disabled')
    }
  }

  const adjustImageInputPlaceholder = () => {
    const { value } = imageSelectElement
    let placeText = ''
    if (value === APP_CONST.icon) {
      placeText = imageInputElement.dataset[APP_CONST.placeholder_icon]
    } else if (value === APP_CONST.image) {
      placeText = imageInputElement.dataset[APP_CONST.placeholder_image]
    }
    imageInputElement.setAttribute('placeholder', placeText)
  }

  const displayNotification = (isSuccess, message) => {
    const boxClass = isSuccess ? APP_CONST.success_notification : APP_CONST.failure_notification
    globalNotificationMessage.textContent = message
    overwriteClass(globalNotification, boxClass)
  }

  const resetFields = (textBoxOnly = false) => {
    inputTable.forEach((input) => {
      const { id } = input
      const elem = document.getElementById(id)
      if (!textBoxOnly || id === 'text') {
        elem.value = ''
        elem.dispatchEvent(keyupEvent)
      }
    })
  }
  window.ii = resetFields

  const init = () => {
    adjustImageInputPlaceholder()
    imageSelectElement.addEventListener('change', () => {
      adjustImageInputPlaceholder()
      imageInputElement.dispatchEvent(keyupEvent)
    })

    inputTable.map((input) => {
      const { id } = input
      const elem = document.getElementById(id)
      ;['keyup', 'change'].map((type) =>
        elem.addEventListener(type, (event) => {
          const invalidClass = input.getInvalidClass()
          const invalidElemTargeted = document.querySelector(`[data-link="${id}"].${invalidClass}`)
          const validated = input.validate(event.target.value)
          ;[].slice.call(document.querySelectorAll(`[data-link="${id}"]`)).map((match) => toggleClass(match, APP_CONST.invis, false))
          toggleClass(invalidElemTargeted, APP_CONST.invis, !validated)
          updateValidation(id, validated)
        })
      )
    })

    document.getElementById('close-how-notification').addEventListener('click', () => {
      toggleClass(document.getElementById('how-notification-box'), APP_CONST.invis, false)
    })

    globalNotificationClose.addEventListener('click', () => {
      toggleClass(globalNotification, APP_CONST.invis, false)
    })

    ;[].slice.call(document.getElementsByClassName(`tab-anchor`)).map((tab) => {
      if (tab.dataset && tab.dataset.content) {
        const tabKind = tab.dataset.content
        const tabGroup = document.getElementById(tabKind + APP_CONST.tab_suffix)
        const tabContent = document.getElementById(tabKind + APP_CONST.content_suffix)
        const allTabGroups = [].slice.call(document.getElementsByClassName('tab-group'))
        const allTabContents = [].slice.call(document.getElementsByClassName('tab-content'))
        tab.addEventListener('click', () => {
          allTabGroups.forEach((elem) => toggleClass(elem, APP_CONST.active, true))
          allTabContents.forEach((elem) => toggleClass(elem, APP_CONST.invis, false))
          toggleClass(tabGroup, APP_CONST.active, false)
          toggleClass(tabContent, APP_CONST.invis, true)
        })
      }
    })

    resetButtonElement.addEventListener('click', () => resetFields())

    submitButtonElement.addEventListener('click', () => {
      if (allValid(validationStatus)) {
        const inputValues = inputTable.map((input) => document.getElementById(input.id).value)
        const formatted = assemblePayload.apply(this, inputValues)
        toggleClass(submitButtonElement, APP_CONST.loading)
        window.fetch('message', {
          method: 'post',
          headers: new window.Headers({
            'content-type': 'application/json',
            'cache-control': 'no-cache'
          }),
          body: JSON.stringify(formatted)
        }).then((response) => response.json())
          .then((response) => {
            const { result, message } = response
            toggleClass(submitButtonElement, APP_CONST.loading)
            if (result === 2000) {
              resetFields(true)
              displayNotification(true, APP_CONST.posted_message)
            } else if (result === 2003) {
              resetFields(true)
              displayNotification(false, APP_CONST.not_posted_message + message)
            }
          })
      }
    })

    toggleClass(document.getElementById('page'), APP_CONST.invis, true)
  }

  init()
})()
