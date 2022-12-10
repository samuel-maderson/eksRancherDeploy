

// --set ingress.ingressClassName=nginx

import { ICallback, Iinfo } from '../types/main';
import Root from './root';


class Rancher extends Root {

    constructor(infoData: Iinfo) {
        super(infoData);
    }


    public helmAddRancherRepo(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
            helm repo add ${this.infoData.rancher.install.name} \
                ${this.infoData.rancher.install.rancherServerUrl}
            `;

            super.shellCommand(command, (stdout, stderr) => {
                
                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                return resolve(response);
            });

        });
        
        return promise
    }


    public helmRepoUpdate(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                helm repo update
            `;

            super.shellCommand(command, (stdout, stderr) => {

                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                return resolve(response);
            });

        });

        return promise;
    }


    public helmCertManagerDownloadRepo(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                kubectl apply -f ${this.infoData.rancher.certManager.url} \
                && \
                helm repo add ${this.infoData.rancher.install.jetstack} ${this.infoData.rancher.install.jetstackUrl} \
                && \
                helm repo update \
                && \
                helm install ${this.infoData.rancher.certManager.namespace} ${this.infoData.rancher.certManager.serviceName} \
                    --namespace ${this.infoData.rancher.certManager.namespace} \
                    --create-namespace \
                    --version ${this.infoData.rancher.certManager.version} \
                && \
                kubectl get pods --namespace ${this.infoData.rancher.certManager.namespace}
            `

            super.shellCommand(command, (stdout, stderr) => {

                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                return resolve(response);
            });
        });

        return promise;
    }



    public helmCertManagerShow(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                kubectl get pods --namespace ${this.infoData.rancher.certManager.namespace}
            `

            super.shellCommand(command, (stdout, stderr) => {

                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                return resolve(response);
            });
        });

        return promise;
    }



    public helmInstallRancher(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                kubectl create namespace ${this.infoData.rancher.install.namespace} | true &
                helm install rancher ${this.infoData.rancher.install.serviceName} \
                    --namespace ${this.infoData.rancher.install.namespace} \
                    --set hostname=${this.infoData.rancher.install.serverUrl} \
                    --set bootstrapPassword=${this.infoData.rancher.install.serverPassword} \
                    --set ingress.ingressClassName=nginx
            `;
            console.log(command);

            super.shellCommand(command, (stdout, stderr) => {

                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                return resolve(response);
            });

        });

        return promise;
        
    }


    public showNginxIngress(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                kubectl get service ${this.infoData.rancher.install.serviceName} \
                --namespace=${this.infoData.rancher.install.name}
            `;

            super.shellCommand(command, (stdout, stderr) => {

                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                return resolve(response);
            });

        });

        return promise;
        
    }
}


export default Rancher;