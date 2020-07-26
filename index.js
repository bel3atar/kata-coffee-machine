import { getCommandType } from './helpers'
import { commandHandlers, exceptionHandlers } from './handlers'

const generateDrinkMakerCommandString = command => {
  const commandType = getCommandType(command)
  try {
    const handler = commandHandlers[commandType]
    return handler(command)
  } catch (exception) {
    const exceptionHandler = exceptionHandlers[exception]
    return exceptionHandler(command)
  }
}
export default generateDrinkMakerCommandString
