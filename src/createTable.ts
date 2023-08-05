import AWS from 'aws-sdk';
import { createDynamoDBInstance } from './dynamoDBConfig';

// Load DynamoDB instance
const dynamoDB = createDynamoDBInstance();

// Create 'users' table
async function createTable() {
  const params = {
    TableName: 'users',

    KeySchema: [
      { AttributeName: 'userID', KeyType: 'HASH' }, // primary key
    ],
    AttributeDefinitions: [
      { AttributeName: 'userID', AttributeType: 'S' },
      { AttributeName: 'timestamp', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'TimestampIndex',
        KeySchema: [
          { AttributeName: 'userID', KeyType: 'HASH' }, // partition key
          { AttributeName: 'timestamp', KeyType: 'RANGE' }, // sort key
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  };

  try {
    await dynamoDB.createTable(params).promise();
    console.log('Users table created successfully!');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}


createTable();
