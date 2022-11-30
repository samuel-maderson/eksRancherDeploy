import { exec } from 'child_process';
import { Iinfo } from '../types/infoType';


class Root {

    protected infoData: Iinfo;

    constructor(infoData: Iinfo) {
        this.infoData = infoData;
    }

    public shellCommand(command: string, callback: (stderr: string, stdout: string) => void) {

        exec(command, (err, stdout, stderr) => {
            (err) && console.error(err);
            (stderr) && console.error(err);
            
            callback(stderr, stdout);
        });

    }

}

export default Root;