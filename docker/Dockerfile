FROM ubuntu:latest

ARG NODE_FILE=node-v18.12.1-linux-x64.tar.xz
ARG NODE_DIR=node-v18.12.1-linux-x64
ARG NODE_URL=https://nodejs.org/dist/v18.12.1/
ARG REPO_DIR=https://github.com/samuel-maderson/eksRancherDeploy.git
ARG PROJECT_DIR=eksRancherDeploy

RUN apt update
RUN apt install git wget xz-utils curl -y

WORKDIR /opt
RUN wget $NODE_URL$NODE_FILE
RUN tar -xvf $NODE_FILE

WORKDIR /opt/$NODE_DIR
RUN mv /opt/$NODE_DIR/lib/node_modules /usr/lib/
RUN mv /opt/$NODE_DIR/bin/* /usr/bin/

RUN npm install typescript -g
RUN npm install ts-node -g

# Install eksctl
RUN curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
RUN mv /tmp/eksctl /usr/local/bin

# Install helm
RUN curl -fsSL -o /tmp/get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 
RUN chmod 700 /tmp/get_helm.sh && /tmp/get_helm.sh

# Install kubectl
RUN curl -L -o /tmp/kubectl https://dl.k8s.io/release/v1.22.0/bin/linux/amd64/kubectl
RUN chmod +x /tmp/kubectl && mv /tmp/kubectl /usr/local/bin/kubectl


WORKDIR /opt
RUN git clone $REPO_DIR
WORKDIR /opt/$PROJECT_DIR

