import Root from './root';
import { Iinfo, ICallback, Ipromise } from '../types/main';

class Eks extends Root {

    constructor(infoData: Iinfo) {
        super(infoData);
    }

    public createCluster() {

        const promise = new Promise((resolve, reject) => {
            let command = `
                eksctl create cluster \
                    --name ${this.infoData.clusterName} --nodes-min ${this.infoData.nodesMin} \
                    --nodes-max ${this.infoData.nodesMax}  --node-type ${this.infoData.nodeType}
            `

            super.shellCommand(command, (stdout, stderr) => {
                let obj = {
                    stdout: stdout,
                    stderr: stderr
                }
                resolve(obj);
            }); 
        })
        return promise;
    }


    public setKubeconfig(callback: ICallback) {
        let command = `
            aws eks update-kubeconfig --region ${this.infoData.AWSCredentials.aws_default_region} --name ${this.infoData.clusterName}
        `
        super.shellCommand(command, (stdout, stderr) => {
            callback(stdout, stderr);
        });
    }


    public showNodes(callback: ICallback) {
        let command = `
            kubectl get nodes
        `
        super.shellCommand(command, (stdout, stderr) => {
            return callback(stdout, stderr);
        });
    }

}

export default Eks;