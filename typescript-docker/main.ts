import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import {Image ,Container, DockerProvider, } from './.gen/providers/docker' ;
import  { AwsProvider} from "@cdktf/provider-aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    // initilaize th nginx image
    new DockerProvider(this, 'default', {
      host :"npipe:////.//pipe//docker_engine"
    }) ;
    const dockerImage = new Image(this, "nginxImage", {
      name: "nginx:latest",
      keepLocally: true,

    });

    new Container(this, "nginxContainer", {
      image: dockerImage.latest,
      name: "tutorial",

      ports: [
        {
          internal: 80,
          external: 8000,
        },
      ],
    });

// Aws provider
new AwsProvider(this,'awsconstructor',{
  region :"us-1",

});

  }
}

const app = new App();
new MyStack(app, "typescript-docker");
app.synth();
