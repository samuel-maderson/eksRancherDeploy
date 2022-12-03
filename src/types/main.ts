export interface Iinfo {
    nodeType: string,
    nodesMin: number,
    nodesMax: number,
    clusterName: string,
    AWSCredentials: {
        aws_access_key_id: string,
        aws_secret_access_key: string,
        aws_default_region: string
    },
    helm: {
        install: {
            ingressNginxUrl: string,
            name: string,
            controller: string,
            namespace:  string,
            version: string
        }
    }
}

export interface IRoot {
    infoData: string;
}


export interface Ipromise {
    (resolve: (value: unknown) => void, reject: (reason?: any) => void): void | undefined
}

export interface ICallback {
    (stdout: string, stderr: string, promise?: Ipromise): void | string
}