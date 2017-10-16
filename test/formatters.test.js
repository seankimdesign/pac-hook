const { isValidString, isAlphanumeric, isHandle, isChannel, isValidTarget } = require('../formatters')

describe(`isValidString() works correctly`, () => {
  test(`isValidString() returns true for 'hello world!'`, () => {
    expect(isValidString('hello world!')).toBe(true)
  })
  test(`isValidString() returns false for an integer`, () => {
    expect(isValidString(7)).toBe(false)
  })
  test(`isValidString() returns false for a blank string`, () => {
    expect(isValidString('')).toBe(false)
  })
})

describe(`isAlphanumeric() works correctly`, () => {
  test(`isAlphanumeric() returns true for 'Area51'`, () => {
    expect(isAlphanumeric('Area51')).toBe(true)
  })
  test(`isAlphanumeric() returns true for 'A-B_C.D.123'`, () => {
    expect(isAlphanumeric('A-B_C.D.123')).toBe(true)
  })
  test(`isAlphanumeric() returns false for 'what did you say?'`, () => {
    expect(isAlphanumeric('what did you say?')).toBe(false)
  })
  test(`isAlphanumeric() returns false for 'apple (banana)'`, () => {
    expect(isAlphanumeric('apple (banana)')).toBe(false)
  })
})

describe(`isValidTarget() works correctly`, () => {
  test(`isValidTarget() allows valid user handle`, () => {
    expect(isValidTarget('@sean.kim')).toBe(true)
  })
})
