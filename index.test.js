import generateDrinkMakerCommandString from '.'
import { PRICES } from './constants'

describe('generateDrinkMakerCommandString function with enough money', () => {
  ;[
    [
      'tea + sugar + stick',
      {
        drink: 'tea',
        amount: 99,
        sugar: 1
      },
      'T:1:0'
    ],
    [
      'coffee + 2 sugars + stick',
      {
        drink: 'coffee',
        amount: 99,
        sugar: 2
      },
      'C:2:0'
    ],
    [
      'chocolate, no sugar nor stick',
      {
        drink: 'chocolate',
        amount: 99,
        sugar: 0
      },
      'H::'
    ],
    ['message', { message: 'message-content' }, 'M:message-content']
  ].forEach(([description, input, expectedOutput]) =>
    test(description, () =>
      expect(generateDrinkMakerCommandString(input)).toStrictEqual(
        expectedOutput
      )
    )
  )
})
describe('generateDrinkMakerCommandString function with NOT enough money', () => {
  ;[
    [
      'tea + sugar + stick',
      {
        drink: 'tea',
        amount: 0,
        sugar: 1
      },
      PRICES.tea
    ],
    [
      'coffee + 2 sugars + stick',
      {
        drink: 'coffee',
        amount: 0,
        sugar: 2
      },
      PRICES.coffee
    ],
    [
      'chocolate, no sugar nor stick',
      {
        drink: 'chocolate',
        amount: 0,
        sugar: 0
      },
      PRICES.chocolate
    ]
  ].forEach(([description, input, expectedOutput]) =>
    test(description, () => {
      const result = generateDrinkMakerCommandString(input)
      expect(result.startsWith('M:'))
      expect(result).toContain(expectedOutput)
    })
  )
})
