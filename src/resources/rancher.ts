import { ICallback, Iinfo } from '../types/main';
import Root from './root';


class Rancher extends Root {

    constructor(infoData: Iinfo) {
        super(infoData);
    }


    public helmAddIngressRepo(callback: ICallback) {

        let command = `
            helm repo add ${this.infoData.helm.install.name} \
                ${this.infoData.helm.install.ingressNginxUrl}
        `;

        super.shellCommand(command, (stdout, stderr) => {
            return callback(stdout, stderr);
        });
    }


    public helmRepoUpdate(callback: ICallback) {

        let command = `
            helm repo update
        `;

        super.shellCommand(command, (stdout, stderr) => {
            return callback(stdout, stderr);
        });
    }


    public helmInstallIngress(callback: ICallback) {
        let command = `
            helm upgrade --install \
                ${this.infoData.helm.install.name} ${this.infoData.helm.install.namespace} \
                --set  controller.service.type=${this.infoData.helm.install.controller} \
                --version ${this.infoData.helm.install.version} \
                --create-namespace
        `;

        super.shellCommand(command, (stdout, stderr) => {
            return callback(stdout, stderr);
        });
    }
}


export default Rancher;