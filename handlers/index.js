import generateDrinkMakerCommandString from '..'
import { DRINK_LETTERS, COMMAND_TYPES, PRICES, EXCEPTIONS } from '../constants'

const messageHandler = ({ message }) => `M:${message}`

const orderHandler = ({ drink, sugar, amount, isExtraHot = false }) => {
  const expectedAmount = PRICES[drink]
  const isMoneyEnough = amount >= expectedAmount
  if (isMoneyEnough) {
    const letter = DRINK_LETTERS[drink]
    const sugarsAndStick = sugar > 0 ? `${sugar}:0` : ':'
    const extraHotFlag = isExtraHot ? 'h' : ''
    return letter + extraHotFlag + ':' + sugarsAndStick
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
