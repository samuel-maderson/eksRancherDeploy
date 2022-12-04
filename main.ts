import Eks from './src/resources/eks';
import * as infoFile from './src/data/info.json';
import { IPromiseResponse } from './src/types/main';
import Rancher from './src/resources/rancher';


try {

    /*
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
            })

        });
    });
    */

    const rancher = new Rancher(infoFile)

    rancher.shellCommand(`echo -n '\\033[0;32m [+] Adding ingress repo: ${infoFile.helm.install.ingressNginxUrl}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});
    rancher.helmAddIngressRepo()
    .then((response: IPromiseResponse) => {

        if (response.stderr) {

            throw new Error(`Error adding ingress repo: ${response.stderr}`);
        }

        rancher.shellCommand(`echo -n '\\033[0;32m [+] Updating helm repos' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

        rancher.helmRepoUpdate()
        .then((response: IPromiseResponse) => {

            if (response.stderr) {

                throw new Error(`Error updating helm repos: ${response.stderr}`);
            }

            rancher.shellCommand(`echo -n '\\033[0;32m [+] Installing nginx ingress: ${infoFile.helm.install.namespace}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

            rancher.helmInstallIngress()
            .then((response: IPromiseResponse) => {

                if (response.stderr) {

                    throw new Error(`Error installing nginx ingress: ${response.stderr}`);
                }

                rancher.shellCommand(`echo -n '\\033[0;32m [+] Showing nginx-ingress controller: ${infoFile.helm.install.namespace}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

                rancher.showNginxIngress()
                .then((response: IPromiseResponse) => {

                    if (response.stderr) {
                        
                        throw new Error(`Error showing nginx-ingress controller: ${response.stderr}`);
                    }

                    rancher.shellCommand(`echo -n '\\033[0;32m ${response.stdout}'`, (stdout, stderr) => {console.log(stdout);});

                })
                
            });

            
        });
    })
    
} catch(err) {

    console.error('Unexpected Error: ', err);

}