import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as docker from '@pulumi/docker-build'

const repository = new awsx.ecr.Repository("dznes-first");

const { userName, password } = aws.ecr.getAuthorizationTokenOutput({
  registryId: repository.repository.registryId,
})

const image = new docker.Image('deploy-docker-image', {
  context: {
    location: '../',
  },
  platforms: ['linux/amd64'],
  push: true,
  registries: [
    {
      address: repository.repository.repositoryUrl,
      username: userName,
      password: password,
    }
  ],
  tags: [
    pulumi.interpolate`${repository.repository.repositoryUrl}:latest`,
  ],
})
//
// const cluster = new awsx.classic.ecs.Cluster('deploy-ecs-cluster')
//
// const lb = new awsx.classic.lb.ApplicationLoadBalancer('deploy-lb', {
//   securityGroups: cluster.securityGroups,
// })
//
// const targetGroup = lb.createTargetGroup('deploy-lb-tg', {
//   protocol: 'HTTP',
//   port: 3333,
//
//   healthCheck: {
//     protocol: 'HTTP',
//     path: '/health',
//     interval: 10,
//     healthyThreshold: 3,
//     unhealthyThreshold: 3,
//     timeout: 5,
//   },
// })
//
// const listener = lb.createListener('deploy-lb-listener', {
//   protocol: 'HTTP',
//   port: 80,
//   targetGroup,
// })
//
// const app = new awsx.classic.ecs.FargateService('deploy-ecs-app', {
//   cluster,
//   desiredCount: 1,
//   waitForSteadyState: false,
//   taskDefinitionArgs: {
//     container: {
//       image: image.ref,
//       cpu: 256,
//       memory: 512,
//       portMappings: [listener],
//     },
//   },
// })
//
// const scalingTarget = new aws.appautoscaling.Target('deploy-as-target', {
//   minCapacity: 1,
//   maxCapacity: 5,
//   serviceNamespace: 'ecs',
//   scalableDimension: 'ecs:service:DesiredCount',
//   resourceId: pulumi.interpolate`service/${cluster.cluster.name}/${app.service.name}`,
// })
//
// new aws.appautoscaling.Policy('deploy-as-policy-cpu', {
//   serviceNamespace: scalingTarget.serviceNamespace,
//   scalableDimension: scalingTarget.scalableDimension,
//   resourceId: scalingTarget.resourceId,
//   policyType: 'TargetTrackingScaling',
//   targetTrackingScalingPolicyConfiguration: {
//     predefinedMetricSpecification: {
//       predefinedMetricType: 'ECSServiceAverageCPUUtilization',
//     },
//     targetValue: 50,
//   },
// })
//
// export const url = listener.endpoint.hostname
