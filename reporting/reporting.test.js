import {
  logSale,
  unitsSoldOf,
  withLogging,
  totalEarned,
  resetSalesRecords
} from '.'
import { PRICES } from '../constants'

beforeEach(resetSalesRecords)

describe('totalEarned function', () => {
  it('should return 0 when the machine starts', () => {
    expect(totalEarned()).toStrictEqual(0)
  })
  it('should return the correct amount after a sale', () => {
    logSale('tea')
    expect(totalEarned()).toBeGreaterThan(0)
  })
})

describe('reset function', () => {
  it('should reset the sales records to zero', () => {
    logSale('orange')
    resetSalesRecords()
    expect(totalEarned()).toStrictEqual(0)
  })
})

describe('logging higher order function', () => {
  describe('success case', () => {
    const fakeHandler = ({ drink }) => drink.toUpperCase()
    const handleAndLog = withLogging(fakeHandler)
    it('should call the handler and return its return value', () =>
      expect(handleAndLog({ drink: 'tea' })).toBe('TEA'))
    it('should log the sale', () => {
      handleAndLog({ drink: 'tea' })
      expect(unitsSoldOf('tea')).toBe(1)
    })
  })
  describe('failure case', () => {
    const handlerThatWillThrow = () => {
      throw 'x'
    }
    const handleAndLog = withLogging(handlerThatWillThrow)
    it('should throw the same error that the handler throws', () =>
      expect(() => handleAndLog({ drink: 'tea' })).toThrow('x'))
  })
})

describe('unitsSoldOf function', () => {
  it('should return 0 when no unit of drink was sold', () =>
    expect(unitsSoldOf('tea')).toStrictEqual(0))
  it('should return 1 when 1 unit is sold', () => {
    logSale('tea')
    expect(unitsSoldOf('tea')).toStrictEqual(1)
  })
})

describe('logSale() function', () => {
  it('should increment the sales counter of said drink correctly', () => {
    logSale('tea')
    logSale('tea')
    logSale('coffee')
    expect(unitsSoldOf('tea')).toBe(2)
    expect(unitsSoldOf('coffee')).toBe(1)
  })
})
