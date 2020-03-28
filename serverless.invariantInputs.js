module.exports = tableName => ({
  attributeDefinitions: [
    {
      AttributeName: "streamId",
      AttributeType: "S"
    },
    {
      AttributeName: "commitId",
      AttributeType: "S"
    },
    {
      AttributeName: "version",
      AttributeType: "N"
    },
    {
      AttributeName: "active",
      AttributeType: "S"
    }
  ],
  keySchema: [
    {
      AttributeName: "streamId",
      KeyType: "HASH"
    },
    {
      AttributeName: "version",
      KeyType: "RANGE"
    }
  ],
  globalSecondaryIndexes: [
    {
      IndexName: `${tableName}-byCommitId`,
      KeySchema: [
        {
          AttributeName: "active",
          KeyType: "HASH"
        },
        {
          AttributeName: "commitId",
          KeyType: "RANGE"
        }
      ],
      Projection: {
        ProjectionType: "ALL"
      }
    }
  ],
  StreamSpecification: {
    StreamViewType: "NEW_IMAGE"
  }
});
