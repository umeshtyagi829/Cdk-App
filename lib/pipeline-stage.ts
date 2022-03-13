import { Stage, StageProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeployEcsStack } from './deploy_ecs-stack';

export class PipelineStage extends Stage {
    public readonly albDomainName: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new DeployEcsStack(this, 'WebService');
        // Expose DeployEcsStack's output one level higher
        this.albDomainName = service.albDomainName;
    }
}