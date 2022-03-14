#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { DeployEcsStack } from '../lib/deploy_ecs-stack';
// import { DynamoDbStack } from '../lib/dynamodb';
import  { PipelineStack } from '../lib/code_pipeline';


const app = new cdk.App();

new PipelineStack (app, 'PipelineStack', {
});

// new DeployEcsStack(app, 'DeployEcsStack', {
//   // env: { account: '123456789012', region: 'us-east-1' },
// });

// new DynamoDbStack(app, 'DynamoDbStack', {
//   // env: { account: '123456789012', region: 'us-east-1' },
// });


