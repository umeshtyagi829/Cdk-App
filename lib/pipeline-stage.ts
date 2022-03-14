import { Stage, StageProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeployEcsStack } from './deploy_ecs-stack';
import { DynamoDbStack } from './dynamodb';

export class PipelineStage extends Stage {
    public readonly albDomainName: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const ecs = new DeployEcsStack(this, 'EcsCluster');
        // Expose DeployEcsStack's output one level higher
        this.albDomainName = ecs.albDomainName;

        const dynamodb = new DynamoDbStack(this, 'DynamoDB');
    }
}