// @ts-check
const { Component } = require("@serverless/core");
const INVARIANT_INPUTS = require("./serverless.invariantInputs");
const { setTableName } = require("./serverless.utils");

/**
 * @typedef EventStoreInputs
 * @property {string} [name]
 * @property {string} [region]
 */

class EventStore extends Component {
  /**
   *
   * @param {EventStoreInputs} inputs
   */
  async default(inputs = {}) {
    const dynamodb = await this.load("@serverless/aws-dynamodb");

    const tableName = setTableName(this, inputs);
    const dynamodbInputs = {
      ...inputs,
      ...INVARIANT_INPUTS(tableName)
    };

    const table = await dynamodb(dynamodbInputs);

    this.state.lastDeployHadNameDefined = Boolean(inputs.name);
    this.state.name = tableName;

    await this.save();

    return {
      name: table.name,
      arn: table.arn,
      region: table.region
    };
  }

  async remove(inputs = {}) {
    const dynamodb = await this.load("@serverless/aws-dynamodb");
    await dynamodb.remove();
    this.state = {};
    await this.save();
    return {};
  }
}

module.exports = EventStore;
