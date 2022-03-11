import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, CodeBuildStep } from 'aws-cdk-lib/pipelines';
import {PipelineStage} from './pipeline-stage';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            // The pipeline name
            pipelineName: 'CdkPipeline',

            // How it will be built and synthesized
            synth: new CodeBuildStep('Synth', {
                // Where the source can be found
                input: CodePipelineSource.gitHub('umeshtyagi829/cdk-pipeline', 'master'),

                // Install dependencies, build and run cdk synth
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ],
            }),

        
        });
        const deploy = new PipelineStage(this, 'Deploy');
        const deployStage = pipeline.addStage(deploy);
    }
}
