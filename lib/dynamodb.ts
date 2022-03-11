import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';


export class DynamoDbStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        // Creating a DynamoDB table
        const table = new dynamodb.Table(this, 'DynamoDbTable', {
            partitionKey: { name: 'EmpName', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            tableName: 'Employee',
        });
        // Creating a SQS queue
        const queue = new sqs.Queue(this, 'SqsQueue', {
            queueName: 'EmployeeQueue',
        });

        // Creating a Lambda function
        const fn = new lambda.Function(this, 'MyFunc', {
            runtime: lambda.Runtime.PYTHON_3_8,
            handler: 'index.lambda_handler',
            code: lambda.Code.fromAsset('src'),
        });
        // Adding an event source to the Lambda function
        const eventSource = new SqsEventSource(queue);
        fn.addEventSource(eventSource);
        table.grantReadWriteData(fn);
        queue.grantConsumeMessages(fn);

    }
}
