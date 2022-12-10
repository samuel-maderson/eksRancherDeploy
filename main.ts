import { IngressActions, EksActions, RancherActions } from './src/resources/wrapper';
 

try {

    EksActions()
    .then((r) => {
        console.log('eks ok');
        if (r) {
            IngressActions()
            .then((r) => {
                if (r) {
                    console.log('ingress ok');
                    RancherActions()
                    .then((r) => {
                        if (r) {
                            console.log('rancher ok');
                        }
                    });
                }   
            });
        }
    });
    
    
    
} catch(err) {

    console.error('Unexpected Error: ', err);

}