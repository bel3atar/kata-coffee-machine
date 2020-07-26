import { commandHandlers, exceptionHandlers } from '.'
import { PRICES, COMMAND_TYPES, EXCEPTIONS } from '../constants'

describe('message handler', () => {
  const handler = commandHandlers[COMMAND_TYPES.MESSAGE]
  it('should forward messages correctly', () =>
    expect(handler({ message: 'toto' })).toStrictEqual('M:toto'))
})

describe('order handler with enough money', () => {
  const handler = commandHandlers[COMMAND_TYPES.ORDER]
  describe('making coffee', () => {
    test('no sugar and therefore w/o stick', () =>
      expect(handler({ amount: 99, drink: 'coffee', sugar: 0 })).toStrictEqual(
        'C::'
      ))
    test('with 1 sugar and therefore w/ stick', () =>
      expect(handler({ amount: 99, drink: 'coffee', sugar: 1 })).toStrictEqual(
        'C:1:0'
      ))
    test('multiple sugars and therefore w/ stick', () =>
      expect(handler({ amount: 99, drink: 'coffee', sugar: 2 })).toStrictEqual(
        'C:2:0'
      ))
  })
  describe('making chocolate', () => {
    test('no sugar and therefore w/o stick', () =>
      expect(
        handler({ amount: 99, drink: 'chocolate', sugar: 0 })
      ).toStrictEqual('H::'))
    test('with 1 sugar and therefore w/ stick', () =>
      expect(
        handler({ amount: 99, drink: 'chocolate', sugar: 1 })
      ).toStrictEqual('H:1:0'))
    test('multiple sugars and therefore w/ stick', () =>
      expect(
        handler({ amount: 99, drink: 'chocolate', sugar: 2 })
      ).toStrictEqual('H:2:0'))
  })
  describe('making tea', () => {
    test('no sugar and therefore w/o stick', () =>
      expect(handler({ amount: 99, drink: 'tea', sugar: 0 })).toStrictEqual(
        'T::'
      ))
    test('with 1 sugar and therefore w/ stick', () =>
      expect(handler({ amount: 99, drink: 'tea', sugar: 1 })).toStrictEqual(
        'T:1:0'
      ))
    test('multiple sugars and therefore w/ stick', () =>
      expect(handler({ amount: 99, drink: 'tea', sugar: 2 })).toStrictEqual(
        'T:2:0'
      ))
  })
})

describe('order handler with NOT enough money', () => {
  const handler = commandHandlers[COMMAND_TYPES.ORDER]
  const { INSUFFICIENT_MONEY } = EXCEPTIONS
  it('should throw when ordering coffe', () =>
    expect(() => handler({ drink: 'coffee', amount: 0 })).toThrow(
      `${INSUFFICIENT_MONEY}`
    ))
  it('should throw when ordering chocolate', () =>
    expect(() => handler({ drink: 'chocolate', amount: 0 })).toThrow(
      `${INSUFFICIENT_MONEY}`
    ))
  it('should throw when ordering tea', () =>
    expect(() => handler({ drink: 'tea', amount: 0 })).toThrow(
      `${INSUFFICIENT_MONEY}`
    ))
})

describe('exception handlers', () => {
  describe('insufficient money handler', () => {
    const handler = exceptionHandlers[EXCEPTIONS.INSUFFICIENT_MONEY]
    it('should generate a message command with the missing amount', () => {
      const priceOfCoffee = PRICES.coffee
      const missing = 0.1
      const returnValue = handler({
        drink: 'coffee',
        amount: priceOfCoffee - missing
      })
      expect(returnValue.startsWith('M:'))
      expect(returnValue.includes(missing))
    })
  })
})
