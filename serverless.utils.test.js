const { setTableName } = require("./serverless.utils");


const GENERATED_NAME = Symbol('GENERATED NAME');


describe("empty state", () => {
  const resourceId = jest.fn().mockReturnValue(GENERATED_NAME);
  const COMPONENT = { state: {}, context: { resourceId } };
  describe("no inputs", () => {
    test("a name is generated", () => {
      expect(setTableName(COMPONENT, {})).toBe(GENERATED_NAME);
    });
  });

  describe("name specified", () => {
    test("the specified name is used", () => {
      expect(setTableName(COMPONENT, { name: "test" })).toBe("test");
    });
  });
});

describe("existing state", () => {
  const resourceId = jest.fn().mockReturnValue(GENERATED_NAME);
  const NAME = Symbol("NAME");
  const NEW_NAME = Symbol('NEW NAME');
  const COMPONENT = { state: { name: NAME, lastDeployHadNameDefined: true }, context: { resourceId } };

  describe("no inputs", () => {
    test("the generated name is used", () => {
      expect(setTableName(COMPONENT, {})).toBe(GENERATED_NAME);
    });
  });

  describe("name specified", () => {
    test("the input name is used", () => {
      expect(setTableName(COMPONENT, { name: NEW_NAME })).toBe(NEW_NAME);
    });
  });
});
