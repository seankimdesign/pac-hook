const { isIcon, assemblePayload } = require('../formatters')

describe(`isIcon() works correctly`, () => {
  test(`returns true for '@sean.kim'`, () => {
    expect(isIcon(':penguin:')).toBe(true)
  })
  test(`returns false for '#lunch_bunch`, () => {
    expect(isIcon(':hello')).toBe(false)
  })
  test(`returns false for '@great@stuff'`, () => {
    expect(isIcon('not:right:')).toBe(false)
  })
})

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