import * as cdk from 'aws-cdk-lib';
import { Capture, Match, Template } from 'aws-cdk-lib/assertions';
import * as DeployEcs from '../lib/deploy_ecs-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/deploy_ecs-stack.ts


test('Cluster Created', () => {
    const ENV_NAME = 'DEV';
    const PREFIX = `${ENV_NAME}-POC`;
    
  const app = new cdk.App();
    // WHEN
  const stack = new DeployEcs.DeployEcsStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ECS::Cluster', {
    ClusterName: `${PREFIX}-Cluster`
  });
});
