import { withNotificationIfShortage } from '.'

describe('notification higher order function', () => {
  const orderHandler = jest.fn()
  const messageHandler = jest.fn()
  const notifyMissingDrink = jest.fn()
  afterEach(() => {
    orderHandler.mockClear()
    messageHandler.mockClear()
    notifyMissingDrink.mockClear()
  })
  describe('when there is a shortage of the ordered drink', () => {
    const isEmpty = jest.fn(() => true)
    beforeEach(() => {
      withNotificationIfShortage(orderHandler, {
        notifyMissingDrink,
        messageHandler,
        isEmpty
      })({ drink: 'tea' })
    })
    it('should not order any thing', () =>
      expect(orderHandler).not.toHaveBeenCalled())
    it('should send a notification', () =>
      expect(notifyMissingDrink).toHaveBeenCalledTimes(1))
    it('should display a message', () =>
      expect(messageHandler).toHaveBeenCalledWith({
        message: 'There is a shortage of tea. The company has been notified.'
      }))
  })
  describe('when there is NO shortage of the ordered drink', () => {
    const isEmpty = jest.fn(() => false)
    beforeEach(() => {
      withNotificationIfShortage(orderHandler, {
        notifyMissingDrink,
        messageHandler,
        isEmpty
      })({ drink: 'tea' })
    })
    it('should order the drink normally', () =>
      expect(orderHandler).toHaveBeenCalledWith({ drink: 'tea' }))
    it('should not send a notification', () =>
      expect(notifyMissingDrink).not.toHaveBeenCalled())
    it('should not display a message', () =>
      expect(messageHandler).not.toHaveBeenCalled())
  })
})
