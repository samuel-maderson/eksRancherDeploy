import Eks from './src/resources/eks';
import * as infoFile from './src/data/info.json';



try {

    const eks = new Eks(infoFile);
    eks.shellCommand(`echo -n '\\033[0;32m [+] Creating cluster: ${infoFile.clusterName}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});

    eks.createCluster()
    .then((r) => {
        console.log(r);
    })
    /*
    eks.createCluster((result, stderr, promise) => {
       if (stderr) {
            //throw new Error(`Error creating cluster: ${stderr}`);
        }

        
        eks.shellCommand(`echo -n '\\033[0;32m [+] Setting KubeConfig: ${infoFile.clusterName}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});
        eks.setKubeconfig((stdout, stderr) => {
            if (stderr) {
                throw new Error(`Error setting kubeconfig: ${stderr}`);
            }

            eks.shellCommand(`echo -n '\\033[0;32m [+] Show cluster nodes: ${infoFile.clusterName}' | tr -d '\n'`, (stdout, stderr) => {console.log(stdout);});
            eks.showNodes((stdout, stderr) => {
                if (stderr) {
                    throw new Error(`Error showing cluster: ${stderr}`);
                }

                console.log(stdout);
            })
        });
        
    });
    */
   
} catch(err) {

    console.error('Unexpected Error: ', err);

}