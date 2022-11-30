import Root from './root';
import { Iinfo } from '../types/infoType';

class Eks extends Root {
    constructor(infoData: Iinfo) {
        super(infoData);
    }

    public createCluster(callback: (stdout: string) => string | void) {

        let command = `
            eksctl create cluster \
                --name ${this.infoData.clusterName} --nodeMin ${this.infoData.nodeMin} \
                --nodeMax ${this.infoData.nodeMax}  --nodeType ${this.infoData.nodeType}
        `
        console.log(command);

        super.shellCommand('ls -lht', (stderr: string, stdout: string) => {
            (stderr) && console.log(stderr);

            return callback(stdout);
        }); 
    }
}

export default Eks;