const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1'});

const util = require('./util.js');


const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;



exports.handler = async (event) => {
try {

    let timestamp = parseInt(event.pathParameters.timestamp);
        let params = {
            TableName: tableName,
            Key: {
                user_id: util.getUserId(event.headers),
                timestamp: timestamp
            }
        };

        await dynamodb.delete(params).promise();

        return {
            statusCode: 200,
            headers: util.getResponseHeaders()
        };
    
} catch (error) {
    console.log("error", error);
    return {
        statusCode: error.statusCode ? error.statusCode: 500,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({
            error: error.name ? error.name : "Exceptions",
            message: error.message ? error.message : "Uknonwn errors"
        })
    }
}


}