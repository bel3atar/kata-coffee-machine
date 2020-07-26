import { getCommandType } from '.'
import { COMMAND_TYPES } from '../constants'

describe('getCommandType() function', () => {
  it('should correctly detect a message', () =>
    expect(getCommandType({ message: 'Hello' })).toStrictEqual(
      COMMAND_TYPES.MESSAGE
    ))
  it('should correctly detect an order', () =>
    expect(getCommandType({ drink: 'coffee' })).toStrictEqual(
      COMMAND_TYPES.ORDER
    ))
})
