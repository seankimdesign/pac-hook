const { assemblePayload } = require('../formatters')

describe(`assemblePayload() works correctly`, () => {
  const correctPayload = {
    username: 'Anonymous Wolf',
    channel: '#lunch_bunch',
    icon_emoji: ':wolf:',
    text: 'This is a test message right here!'
  }
  test(`returns a correctly assembled object`, () => {
    expect(assemblePayload('Anonymous Wolf', '#lunch_bunch', ':wolf:', 'This is a test message right here!')).toMatchObject(correctPayload)
  })
})
