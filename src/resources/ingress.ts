import { ICallback, Iinfo } from '../types/main';
import Root from './root';


class Ingress extends Root {

    constructor(infoData: Iinfo) {
        super(infoData);
    }


    public helmAddIngressRepo(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
            helm repo add ${this.infoData.ingress.install.name} \
                ${this.infoData.ingress.install.ingressNginxUrl}
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
                kubectl create namespace ${this.infoData.ingress.install.name} | true &&
                helm upgrade --install \
                    ${this.infoData.ingress.install.name} ${this.infoData.ingress.install.namespace} \
                    --namespace ${this.infoData.ingress.install.name} \
                    --set  controller.service.type=${this.infoData.ingress.install.controller} \
                    --version ${this.infoData.ingress.install.version} \
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
                kubectl get service ${this.infoData.ingress.install.serviceName} \
                --namespace=${this.infoData.ingress.install.name}
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


export default Ingress;