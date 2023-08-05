import AWS from 'aws-sdk';
import { createDynamoDBInstance } from './dynamoDBConfig';

// Load DynamoDB instance
const dynamoDB = createDynamoDBInstance();

// User Interface
interface User {
  userID: string;
  name: string;
  age: number;
}

// Create User
export async function createUser(userID: string, name: string, age: number): Promise<void> {

    
    if (!userID) {
        throw new Error('userID cannot be null');
    }

    // Set properties in params
    const params = {
        TableName: 'users',
        Item: {
            userID: { S: userID },
            name: { S: name },
            age: { N: age.toString() },
            timestamp: { N: Date.now().toString() }
        }
    };
    
        try {
        // Pass params to DynamoDB putItem method
        await dynamoDB.putItem(params).promise();
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Get user by userID
export async function getUser(userID: string): Promise<User | null> {

    if (!userID) {
        throw new Error('userID cannot be null');
    }

    try {

        // Prepare params for getItem method
        const params = {
            TableName: 'users',
            Key: {
                'userID': { S: userID }
            }
        };

        // Capture the result object
        const result = await dynamoDB.getItem(params).promise();

        // Get Item from the result object
        const user = result.Item;

        // If user doesn't exist return null
        if (!user) {
            return null;
        }

        // Return user
        return {
            userID: user.userID.S || '',
            name: user.name.S || '',
            age: user?.age?.N ? parseInt(user.age.N, 10) : 0
        };
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Update user age by userID
export async function updateUserAge(userID: string, newAge: number): Promise<void> {

    if (!userID) {
        throw new Error('userID cannot be null');
    }

    // Prepare params for update
    const params = {
        TableName: 'users',
        Key: {
            'userID': { S: userID }
        },
        UpdateExpression: 'SET #age = :newAge',
        ExpressionAttributeNames: {
            '#age': 'age'
        },
        ExpressionAttributeValues: {
            ':newAge': { N: newAge.toString() }
        }
    };

    try {
        await dynamoDB.updateItem(params).promise();
    } catch (error) {
        console.error('Error updating user age:', error);
    }
}

// Delete user
export async function deleteUser(userID: string): Promise<void> {

    if (!userID) {
        throw new Error('userID cannot be null');
    }

    // Prepare params for delete
    const params = {
        TableName: 'users',
        Key: {
            userID: { S: userID }
        }
    };

    try {
        await dynamoDB.deleteItem(params).promise();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
    
}
