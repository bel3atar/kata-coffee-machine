import { PRICES } from '../constants'

const sales = {}

const logSale = drink => {
  if (sales[drink] === undefined) sales[drink] = 1
  else ++sales[drink]
}

const unitsSoldOf = drink => sales[drink] || 0

const totalEarned = () =>
  Object.entries(sales).reduce(
    (total, [drink, soldCount]) => total + PRICES[drink] * soldCount,
    0
  )

const resetSalesRecords = () =>
  Object.keys(sales).forEach(drink => (sales[drink] = 0))

const withLogging = handler => args => {
  const result = handler(args)
  logSale(args.drink)
  return result
}

export { resetSalesRecords, withLogging, logSale, unitsSoldOf, totalEarned }
