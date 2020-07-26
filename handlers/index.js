import generateDrinkMakerCommandString from '..'
import { COMMAND_TYPES, PRICES, EXCEPTIONS } from '../constants'

const messageHandler = ({ message }) => `M:${message}`

const orderHandler = ({ drink, sugar, amount }) => {
  const expectedAmount = PRICES[drink]
  const isMoneyEnough = amount >= expectedAmount
  if (isMoneyEnough) {
    const letter = { coffee: 'C', chocolate: 'H', tea: 'T' }[drink]
    const sugarsAndStick = sugar > 0 ? `${sugar}:0` : ':'
    return letter + ':' + sugarsAndStick
  } else {
    throw EXCEPTIONS.INSUFFICIENT_MONEY
  }
}

const insufficientMoneyHandler = ({ amount, drink }) =>
  generateDrinkMakerCommandString({
    message: `You are missing ${PRICES[drink] - amount} euros`
  })

const commandHandlers = {
  [COMMAND_TYPES.MESSAGE]: messageHandler,
  [COMMAND_TYPES.ORDER]: orderHandler
}

const exceptionHandlers = {
  [EXCEPTIONS.INSUFFICIENT_MONEY]: insufficientMoneyHandler
}

export { commandHandlers, exceptionHandlers }
