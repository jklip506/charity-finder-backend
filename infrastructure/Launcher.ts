import { SpaceStack } from "./SpaceFinder";
import { App } from 'aws-cdk-lib';

const app = new App();
new SpaceStack(app, 'Space-finder', {
    stackName: 'Spacefinder'
})