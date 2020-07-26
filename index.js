const COMMAND_TYPES = { MESSAGE: 0, ORDER: 1 };

const getCommandType = command =>
  command.message ? COMMAND_TYPES.MESSAGE : COMMAND_TYPES.ORDER;

const messageHandler = ({ message }) => `M:${message}`;

const orderHandler = ({ drink, sugar }) =>
  ({ coffee: "C", chocolate: "H", tea: "T" }[drink] +
  ":" +
  (sugar > 0 ? `${sugar}:0` : ":"));

const commandHandlers = {
  [COMMAND_TYPES.MESSAGE]: messageHandler,
  [COMMAND_TYPES.ORDER]: orderHandler
};

const generateDrinkMakerCommandString = command => {
  const commandType = getCommandType(command);
  const handler = commandHandlers[commandType];
  return handler(command)
};

module.exports = {
  generateDrinkMakerCommandString
};
