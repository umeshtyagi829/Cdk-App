#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DeployEcsStack } from '../lib/deploy_ecs-stack';
// import { DynamoDbStack } from '../lib/dynamodb';
// import  { PipelineStack } from '../lib/code_pipeline';


// const envUSEast1 = {
//   'account': '945515415056',
//   'region': 'us-east-1',
// }

const app = new cdk.App();

// new PipelineStack (app, 'PipelineStack', {
//   // env: envUSEast1
// });

new DeployEcsStack(app, 'DeployEcsStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
});

// new DynamoDbStack(app, 'DynamoDbStack', {
//   // env: { account: '123456789012', region: 'us-east-1' },
// });





// #!/usr/bin/env node
// import 'source-map-support/register';
// import * as cdk from 'aws-cdk-lib';
// import { DeployEcsStack } from '../lib/deploy_ecs-stack';
// import { DynamoDbStack } from '../lib/dynamodb';
// import { PipelineStack } from '../lib/code_pipeline';
// import { Construct } from 'constructs';

// const envUSEast1 = {
//   'account': '945515415056',
//   'region': 'us-east-1',
// }

// interface EnvProps {
//   prod: boolean;
// }

// class MyService extends Construct {
//   constructor(scope: Construct, id: string, props?: EnvProps) {
//     super(scope, id);

//     // we might use the prod argument to change how the service is configured
//     new PipelineStack(this, 'PipelineStack', {
//       env: envUSEast1
//     });

//     new DeployEcsStack(this, 'DeployEcsStack', {
//       env: envUSEast1
//     });

//     new DynamoDbStack(this, 'DynamoDbStack', {
//       env: envUSEast1

//     });
//   }
// }
// const app = new cdk.App();
// new MyService(app, "beta");
// new MyService(app, "prod", { prod: false });
// app.synth()