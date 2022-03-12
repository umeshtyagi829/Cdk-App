import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class DeployEcsStack extends Stack {
  public readonly albDomainName: CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });

    // use a security group to provide a secure connection between the ALB and the containers
    const albSG = new ec2.SecurityGroup(this, "alb-SG", {
      vpc,
      allowAllOutbound: true,
    });

    albSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow http traffic"
    );

    // Application load balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, `alb`, {
      vpc,
      vpcSubnets: { subnets: vpc.privateSubnets },
      internetFacing: false,
    }
    );
    // Add security group to the load balancer
    alb.addSecurityGroup(albSG);

    // Target group to make resources containers dicoverable by the application load balancer
    const targetGroupHttp = new elbv2.ApplicationTargetGroup(this, "target-group", {
      port: 80,
      vpc,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targetType: elbv2.TargetType.IP,
    }
    );

    // Health check for containers to check they were deployed correctly
    targetGroupHttp.configureHealthCheck({
      path: "/",
      protocol: elbv2.Protocol.HTTP,
    });

    // only allow HTTP connections 
    const listener = alb.addListener("alb-listener", {
      open: true,
      port: 80,
    });

    listener.addTargetGroups("alb-listener-target-group", {
      targetGroups: [targetGroupHttp],
    });

    // ECS cluster
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });
    

    const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      memoryLimitMiB: 2048,
      cpu: 1024,
    });

    // Add a container to the task definition
    const container = fargateTaskDefinition.addContainer("WebContainer", {
      // Use an image from DockerHub
      image: ecs.ContainerImage.fromRegistry("nginx"),
      memoryLimitMiB: 512
    });

    // Maping the container ports to the Host port
    container.addPortMappings({ containerPort: 80 });

    // Create a service and associate it with the load balancer
    const service = new ecs.FargateService(this, 'Service', {
      serviceName: 'nginx-service',
      cluster,
      taskDefinition: fargateTaskDefinition,
      assignPublicIp: false,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_NAT }
    });

    // add to a target group so make containers discoverable by the application load balancer
    service.attachToApplicationTargetGroup(targetGroupHttp);

    this.albDomainName = new CfnOutput(this, 'ALBDomainName', {
      value: alb.loadBalancerDnsName
    });

  }
}
