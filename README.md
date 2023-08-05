<!-- Steps I did - Rajiv -->

# Step 1: Create GIT repository
a. Create directory `AWSTypeDynamo`
b. Run `git init`
c. Run `npm install typescript`
d. Run `npm install aws-sdk`

# Step 2: Setup DynamoDB locally
a. Downloaded DynamoDB from https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title
b. In Terminal went to the location where the DynamoDB in located. Ex: cd /Users/cloudexpat/Downloads/dynamodb_local_lates
c. Initiated the installation of DynamoDB by running the following command: 
    java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
d. It runs the DB in localhost:8000
e. Download AWS CLI
f. Configure AWS CLI by running `aws configure`. Provided with credentials, region and output format.

# Step 3: Define the output directory in tsconfig.json
a. In tsconfig.json file, add "outDir": "./dist" so that the compiled files are stored in the output directory


<!-- Steps to the reviewer to tests - Asaf -->
# Step 4: Users table creation in dynamoDB
a. The table can be created in two ways
    i. By using aws command in cli
    ii. Through script
   For this test, I chose to create the table using script.
   To create the `users` table, run `npx tsc` command and then run `node dist/createTable.js`

   It creates `users` table with userID as primary key and timestamp as sort key.

# Step 5: Test
a. run `node dist/test.js`
   Check console output for test results.
