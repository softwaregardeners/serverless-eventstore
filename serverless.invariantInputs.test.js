const invariantInputs = require("./serverless.invariantInputs");

test("returns an object with the expected keys", () => {
  const inputs = invariantInputs("test");
  expect(inputs).toBeDefined();
  expect(inputs.attributeDefinitions).toBeDefined();
  expect(inputs.keySchema).toBeDefined();
  expect(inputs.globalSecondarIndexes).toBeDefined();
  expect(inputs.globalSecondarIndexes.length).toBe(1);
  expect(inputs.globalSecondarIndexes[0].IndexName).toBe("test-byCommitId");
  expect(inputs.StreamSpecification).toBeDefined();
});
