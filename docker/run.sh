#!/bin/bash

export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=

cd /opt/eksRancherDeploy && ts-node ts-node main.ts
