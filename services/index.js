class EmailNotifier {
  static notifyMissingDrink (drink) {}
}
class BeverageQuantityChecker {
  static isEmpty (drink) {
    return false
  }
}

const withNotificationIfShortage = (
  orderHandler,
  { notifyMissingDrink, messageHandler, isEmpty }
) => args => {
  const { drink } = args
  if (isEmpty(drink)) {
    notifyMissingDrink(drink)
    return messageHandler({
      message: `There is a shortage of ${drink}. The company has been notified.`
    })
  } else {
    return orderHandler(args)
  }
}

export { withNotificationIfShortage, BeverageQuantityChecker, EmailNotifier }
