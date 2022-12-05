import Eks from './eks';
import * as infoFile from '../data/info.json';
import { IPromiseResponse } from './../types/main';
import Ingress from './ingress';


export const EksActions = () => {

    return new Promise((resolve, reject) => {
        const eks = new Eks(infoFile);
        eks.shellCommand(`echo -n '\\033[0;32m [+] Creating cluster: ${infoFile.clusterName}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});
        eks.createCluster()
        .then((response: IPromiseResponse) => {
            
            if (response.stderr) {
                throw new Error(`Error creating cluster: ${response.stderr}`);
            }

            eks.shellCommand(`echo -n '\\033[0;32m [+] Setting KubeConfig: ${infoFile.clusterName}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});
            
            eks.setKubeconfig()
            .then((response: IPromiseResponse) => {

                if (response.stderr) {
                    throw new Error(`Error setting kubeconfig: ${response.stderr}`);
                }

                eks.shellCommand(`echo -n '\\033[0;32m [+] Show cluster nodes: ${infoFile.clusterName}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

                eks.showNodes()
                .then((response: IPromiseResponse) => {

                    if (response.stderr) {
                        throw new Error(`Error showing cluster: ${response.stderr}`);
                    }

                    eks.shellCommand(`echo -n '\\033[0;32m ${response.stdout}'`, (stdout, stderr) => {console.log(stdout);});
                    resolve(true);
                })

            });
        });

        
    });
    

}



export const IngressActions = () => {

    return new Promise((resolve, reject) => {

        const ingress = new Ingress(infoFile)

        ingress.shellCommand(`echo -n '\\033[0;32m [+] Adding ingress repo: ${infoFile.ingress.install.ingressNginxUrl}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});
        ingress.helmAddIngressRepo()
        .then((response: IPromiseResponse) => {

            if (response.stderr) {

                throw new Error(`Error adding ingress repo: ${response.stderr}`);
            }

            ingress.shellCommand(`echo -n '\\033[0;32m [+] Updating helm repos' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

            ingress.helmRepoUpdate()
            .then((response: IPromiseResponse) => {

                if (response.stderr) {

                    throw new Error(`Error updating helm repos: ${response.stderr}`);
                }

                ingress.shellCommand(`echo -n '\\033[0;32m [+] Installing nginx ingress: ${infoFile.ingress.install.namespace}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

                ingress.helmInstallIngress()
                .then((response: IPromiseResponse) => {

                    if (response.stderr) {

                        throw new Error(`Error installing nginx ingress: ${response.stderr}`);
                    }

                    ingress.shellCommand(`echo -n '\\033[0;32m [+] Showing nginx-ingress controller: ${infoFile.ingress.install.namespace}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

                    ingress.showNginxIngress()
                    .then((response: IPromiseResponse) => {

                        if (response.stderr) {
                            
                            throw new Error(`Error showing nginx-ingress controller: ${response.stderr}`);
                        }

                        ingress.shellCommand(`echo -n '\\033[0;32m ${response.stdout}'`, (stdout, stderr) => {console.log(stdout);});
                        resolve(true);
                    })
                    
                });

                
            });
        });

        
    });

}


