# eksRancherDeploy
This is project that automatically create the infrastructure using EKS and Rancher

The mainly purpose is obviously auto deploy EKS & Rancher, is a good option if you use AWS platform as sandbox and as well the another one objective is to learn e practice more about Typescript, which a language that I'm learning right now.

# Requirements
- TypeScript
- ts-node


# How to use

apply AWS credentials.

```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=
```

After that check the ```src/data/info.json``` file.
In this file are the content that will gonna be used for deploy.

Finally run the code.
```
ts-node main.ts
```
