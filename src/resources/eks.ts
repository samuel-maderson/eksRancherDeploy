import Root from './root';
import { Iinfo, IPromiseResponse} from '../types/main';

class Eks extends Root {

    constructor(infoData: Iinfo) {
        super(infoData);
    }

    public createCluster(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                eksctl create cluster \
                    --name ${this.infoData.clusterName} --nodes-min ${this.infoData.nodesMin} \
                    --nodes-max ${this.infoData.nodesMax}  --node-type ${this.infoData.nodeType}
            `

            super.shellCommand(command, (stdout, stderr) => {
                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                resolve(response);
            }); 

        })

        return promise;
    }


    public setKubeconfig(): any {

        const promise = new Promise((resolve, reject) => {

            let command = `
                aws eks update-kubeconfig --region ${this.infoData.AWSCredentials.aws_default_region} --name ${this.infoData.clusterName}
            `
            super.shellCommand(command, (stdout, stderr) => {
                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                resolve(response);
            });

        });

        return promise;
    }


    public showNodes(): any {

        const promise = new Promise((resolve, reject) => {
        
            let command = `
                kubectl get nodes
            `
            super.shellCommand(command, (stdout, stderr) => {
                
                let response = {
                    stdout: stdout,
                    stderr: stderr
                }

                resolve(response);
            });

        });

        return promise;
    }

}


export default Eks;