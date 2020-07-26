const { generateDrinkMakerCommandString } = require("./index");
describe("generateDrinkMakerCommandString function", () => {
  [
    [
      "tea + sugar + stick",
      {
        drink: "tea",
        sugar: 1
      },
      "T:1:0"
    ],
    [
      "coffee + 2 sugars + stick",
      {
        drink: "coffee",
        sugar: 2
      },
      "C:2:0"
    ],
    [
      "chocolate, no sugar nor stick",
      {
        drink: "chocolate",
        sugar: 0
      },
      "H::"
    ],
    ["message", { message: "message-content" }, "M:message-content"]
  ].forEach(([description, input, expectedOutput]) =>
    test(description, () =>
      expect(generateDrinkMakerCommandString(input)).toStrictEqual(
        expectedOutput
      )
    )
  );
});
