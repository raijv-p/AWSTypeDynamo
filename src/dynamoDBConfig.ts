import AWS from 'aws-sdk';

export function createDynamoDBInstance(): AWS.DynamoDB {
    return new AWS.DynamoDB({
        region: 'ca-central-1',
        endpoint: 'http://localhost:8000'
    });
}
