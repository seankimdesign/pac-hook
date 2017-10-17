const { assemblePayload, unpackResponse } = require('../formatters')

describe(`assemblePayload() works correctly`, () => {
  const correctPayload = {
    name: 'Anonymous Wolf',
    destination: '#lunch_bunch',
    image: {
      icon: ':wolf:'
    },
    message: 'This is a test message right here!'
  }
  test(`returns a correctly assembled object`, () => {
    expect(assemblePayload('Anonymous Wolf', '#lunch_bunch', ':wolf:', 'This is a test message right here!')).toMatchObject(correctPayload)
  })
})
