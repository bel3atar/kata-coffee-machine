import { COMMAND_TYPES } from '../constants'

const getCommandType = command =>
  command.message ? COMMAND_TYPES.MESSAGE : COMMAND_TYPES.ORDER

export { getCommandType }
