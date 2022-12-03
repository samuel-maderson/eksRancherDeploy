import { exec } from 'child_process';
import { Iinfo, ICallback } from '../types/main';


class Root {

    protected infoData: Iinfo;

    constructor(infoData: Iinfo) {
        this.infoData = infoData;
    }

    public shellCommand(command: string, callback: ICallback) {

        exec(command, (err, stdout, stderr) => {
            
            callback(stdout, stderr);
        });
    }

}

export default Root;