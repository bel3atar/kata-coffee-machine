import { logSale, unitsSoldOf, totalEarned } from '.'
import { PRICES } from '../constants'

describe('logging feature', () => {
  beforeAll(() => {
    logSale('orange')
    logSale('orange')
    logSale('coffee')
  })
  test('unitsSoldOf function', () => {
    expect(unitsSoldOf('orange')).toBe(2)
    expect(unitsSoldOf('coffee')).toBe(1)
    expect(unitsSoldOf('tea')).toBe(0)
  })
  test('totalEarned function', () => {
    expect(totalEarned()).toBe(2 * PRICES.orange + PRICES.coffee)
  })
})
