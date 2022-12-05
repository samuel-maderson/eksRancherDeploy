import { IngressActions, EksActions } from './src/resources/wrapper';
 

try {

    EksActions()
    .then((r) => {
        console.log('result', r);
        if (r) {
            IngressActions()
            .then((r) => {
                if (r) {
                    console.log('ingress ok')
                }
            });
        }
    });
    
    
    
} catch(err) {

    console.error('Unexpected Error: ', err);

}