# eksRancherDeploy
This is a project that automatically create the infrastructure using EKS and Rancher

The mainly purpose is obviously auto deploy EKS & Rancher, is a good option if you're using AWS platform as sandbox like acloudguru and as well the another one objective is to learn and practice more about Typescript, which is the language that I'm learning right now.

# Requirements
- Docker


# How to use

With the docker installed on your system, run the following commands on root of project:

```
# Build docker image
docker build -t eks-rancher-deploy .

# Deploy project image on docker
docker run -it --rm --name eks-rancher-deploy eks-rancher-deploy

# Connect to bash on docker project
docker exec -it eks-rancher-deploy /bin/bash
```


# Configure AWS Credentials

After you've attach to bash on docker project, to go /opt/eks-rancher-deploy/docker directory, there you'll find a file run.sh, change the environment variables below to your properly AWS Credentials.

```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=
```

Then run:

```
./run.sh
```

Now this will take a while to finish, over than 20min I guess, it's important to keep the program running without interruption.

See a example of success output:

```
 [+] Creating cluster: eks-cluster01
 [+] Setting KubeConfig: eks-cluster01
 [+] Show cluster nodes: eks-cluster01
 [+] Adding ingress repo: https://kubernetes.github.io/ingress-nginx
 NAME                             STATUS   ROLES    AGE   VERSION
ip-192-168-22-88.ec2.internal    Ready    <none>   83s   v1.27.9-eks-5e0fdde
ip-192-168-27-131.ec2.internal   Ready    <none>   85s   v1.27.9-eks-5e0fdde
ip-192-168-51-201.ec2.internal   Ready    <none>   82s   v1.27.9-eks-5e0fdde

 [+] Updating helm repos
 [+] Installing nginx ingress: ingress-nginx/ingress-nginx
 [+] Showing nginx-ingress controller: ingress-nginx/ingress-nginx
 [+] Adding rancher repo: https://releases.rancher.com/server-charts/stable
 NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP                                                               PORT(S)                      AGE
ingress-nginx-controller   LoadBalancer   10.100.22.122   ae4319aa9379245c593dab06623e39fc-1607309599.us-east-1.elb.amazonaws.com   80:31894/TCP,443:31688/TCP   18s

 [+] Updating helm repos
 [+] Downloading CertManager repo: cattle-system
 [+] Showing certmanager: customresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/issuers.cert-manager.io created
customresourcedefinition.apiextensions.k8s.io/orders.acme.cert-manager.io created
"jetstack" has been added to your repositories
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "ingress-nginx" chart repository
...Successfully got an update from the "jetstack" chart repository
...Successfully got an update from the "rancher-stable" chart repository
Update Complete. ⎈Happy Helming!⎈
NAME: cert-manager
LAST DEPLOYED: Sun Feb  4 22:57:23 2024
NAMESPACE: cert-manager
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
cert-manager v1.7.1 has been deployed successfully!

In order to begin issuing certificates, you will need to set up a ClusterIssuer
or Issuer resource (for example, by creating a letsencrypt-staging issuer).

More information on the different types of issuers and how to configure them
can be found in our documentation:

https://cert-manager.io/docs/configuration/

For information on how to configure cert-manager to automatically provision
Certificates for Ingress resources, take a look at the `ingress-shim`
documentation:

https://cert-manager.io/docs/usage/ingress/
NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5669c8856-q6qhz               1/1     Running   0          21s
cert-manager-cainjector-56c86fc86f-85kzr   1/1     Running   0          21s
cert-manager-webhook-5b9ddcfbb8-486mg      1/1     Running   0          21s


                kubectl create namespace cattle-system | true &
                helm install rancher rancher-stable/rancher                     --namespace cattle-system                     --set hostname=rancher.my.org                     --set bootstrapPassword=admin                     --set ingress.ingressClassName=nginx
            
 [+] Installing rancher server: rancher-stable
root@3db4c1212b68:/opt/eksRancherDeploy/docker# kubectl get nodes
NAME                             STATUS   ROLES    AGE     VERSION
ip-192-168-22-88.ec2.internal    Ready    <none>   3m33s   v1.27.9-eks-5e0fdde
ip-192-168-27-131.ec2.internal   Ready    <none>   3m35s   v1.27.9-eks-5e0fdde
ip-192-168-51-201.ec2.internal   Ready    <none>   3m32s   v1.27.9-eks-5e0fdde
```

# Rancher

To access rancher change your /etc/hosts with the following line:

```
AWS-ALB-IP rancher.my.org
```

Go to browser and type: 
https://rancher.my.org


# Customize

check the ```src/data/info.json``` file.
In this file are the content that will gonna be used for deploy.
