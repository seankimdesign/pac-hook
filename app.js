const APP_CONST = require('./constants')
const { isValidString, isIcon, isImage, isHandle, isChannel } = require('./validators')
const { toggleVisibility } = require('./dom')

;(() => {
  const imageSelectElement = document.getElementById('image-type')
  const imageInputElement = document.getElementById('image')
  const submitButtonElement = document.getElementById('do-submit')
  const resetButtonElement = document.getElementById('do-reset')

  const getImageTypeSelectValue = () => imageSelectElement.value
  const defaultGetValidationFail = () => APP_CONST.invalid_elem

  const inputTable = [
    {
      id: 'username',
      getInvalidClass: defaultGetValidationFail,
      validate: isValidString
    }, {
      id: 'image',
      getInvalidClass: () => APP_CONST.invalid_elem +
        (getImageTypeSelectValue() === APP_CONST.icon ? APP_CONST.icon_suffix : APP_CONST.image_suffix),
      validate: (value) => {
        const onIcon = getImageTypeSelectValue() === APP_CONST.icon
        return isValidString(value) && (onIcon ? isIcon(value) : isImage(value))
      }
    }, {
      id: 'channel',
      getInvalidClass: defaultGetValidationFail,
      validate: (value) => isHandle(value) || isChannel(value)
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
      if (validationStatus.every((input) => input.validated)) submitButtonElement.removeAttribute('disabled')
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

  const submissionListener = submitButtonElement.addEventListener('click', () => {
    window.fetch('message', {
      method: 'post',
      headers: new window.Headers({
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      }),
      body: JSON.stringify({'hey': 'wazzup?'})
    }).then((response) => {
      let formatted = response.json()
      formatted.then(console.log)
    })
  })

  const init = () => {
    adjustImageInputPlaceholder()

    imageSelectElement.addEventListener('change', adjustImageInputPlaceholder)
    inputTable.map((input) => {
      const { id } = input
      const elem = document.getElementById(id)
      ;['keyup', 'change'].map((type) =>
        elem.addEventListener(type, (event) => {
          const invalidClass = input.getInvalidClass()
          const invalidElemTargeted = document.querySelector(`[data-link="${id}"].${invalidClass}`)
          const validated = input.validate(event.target.value)
          ;[].slice.call(document.querySelectorAll(`[data-link="${id}"]`)).map((match) => toggleVisibility(match, false))
          toggleVisibility(invalidElemTargeted, !validated)
          updateValidation(id, validated)
        })
      )
    })
  }

  init()
})()
