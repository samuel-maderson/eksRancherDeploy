import Eks from './src/resources/eks';
import * as infoFile from './src/data/info.json';


const eks = new Eks(infoFile);
eks.createCluster((result: string) => {
    console.log('my result', result);
});
