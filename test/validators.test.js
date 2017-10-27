const { isValidString, isAlphanumeric, isHandle, isChannel, isValidTarget, isIcon } = require('../validators')

describe(`isValidString() works correctly`, () => {
  test(`returns true for 'hello world!'`, () => {
    expect(isValidString('hello world!')).toBe(true)
  })
  test(`returns false for an integer`, () => {
    expect(isValidString(7)).toBe(false)
  })
  test(`returns false for a blank string`, () => {
    expect(isValidString('')).toBe(false)
  })
})

describe(`isAlphanumeric() works correctly`, () => {
  test(`returns true for 'Area51'`, () => {
    expect(isAlphanumeric('Area51')).toBe(true)
  })
  test(`returns true for 'A-B_C.D.123'`, () => {
    expect(isAlphanumeric('A-B_C.D.123')).toBe(true)
  })
  test(`returns false for 'what did you say?'`, () => {
    expect(isAlphanumeric('what did you say?')).toBe(false)
  })
  test(`returns false for 'apple (banana)'`, () => {
    expect(isAlphanumeric('apple (banana)')).toBe(false)
  })
})

describe(`isHandle() works correctly`, () => {
  test(`returns true for '@sean.kim'`, () => {
    expect(isHandle('@sean.kim')).toBe(true)
  })
  test(`returns false for '#lunch_bunch`, () => {
    expect(isHandle('#lunch_bunch')).toBe(false)
  })
  test(`returns false for '@great@stuff'`, () => {
    expect(isHandle('@great@stuff')).toBe(false)
  })
})

describe(`isChannel() works correctly`, () => {
  test(`returns true for '#lunch_bunch'`, () => {
    expect(isChannel('#lunch_bunch')).toBe(true)
  })
  test(`returns false for '@sean.kim`, () => {
    expect(isChannel('@sean.kim')).toBe(false)
  })
  test(`returns false for '###awesome'`, () => {
    expect(isChannel('###awesome')).toBe(false)
  })
})

describe(`isValidTarget() works correctly`, () => {
  test(`returns true for user handle '@sk8erboi'`, () => {
    expect(isValidTarget('@sk8erboi')).toBe(true)
  })
  test(`returns true for channel '#bugs-r-us'`, () => {
    expect(isValidTarget('#bugs-r-us')).toBe(true)
  })
  test(`returns false for string 'ama-zing'`, () => {
    expect(isValidTarget('ama-zing')).toBe(false)
  })
  test(`returns false for string '#user@domain.com'`, () => {
    expect(isValidTarget('#user@domain.com')).toBe(false)
  })
})

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
