import { ICallback, Iinfo } from '../types/main';
import Root from './root';


class Rancher extends Root {

    constructor(infoData: Iinfo) {
        super(infoData);
    }


    public helmAddIngressRepo(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
            helm repo add ${this.infoData.helm.install.name} \
                ${this.infoData.helm.install.ingressNginxUrl}
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


    public helmInstallIngress(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                kubectl create namespace ${this.infoData.helm.install.name} | true &&
                helm upgrade --install \
                    ${this.infoData.helm.install.name} ${this.infoData.helm.install.namespace} \
                    --namespace ${this.infoData.helm.install.name} \
                    --set  controller.service.type=${this.infoData.helm.install.controller} \
                    --version ${this.infoData.helm.install.version} \
                    --create-namespace
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


    public showNginxIngress(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                kubectl get service ${this.infoData.helm.install.serviceName} \
                --namespace=${this.infoData.helm.install.name}
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