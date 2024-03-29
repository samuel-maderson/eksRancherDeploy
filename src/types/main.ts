export interface Iinfo {
    nodeType: string,
    nodesMin: number,
    nodesMax: number,
    clusterName: string,
    roleArn: string,
    AWSCredentials: {
        aws_access_key_id: string,
        aws_secret_access_key: string,
        aws_default_region: string
    },
    ingress: {
        install: {
            ingressNginxUrl: string,
            name: string,
            controller: string,
            namespace:  string,
            version: string,
            serviceName: string
        }
    },
    rancher: {
        install: {
            rancherServerUrl: string,
            name: string,
            controller: string,
            namespace: string,
            serviceName: string,
            jetstack: string,
            jetstackUrl: string,
            serverUrl: string,
            serverPassword: string
        },
        certManager: {
            url: string,
            namespace: string,
            serviceName: string,
            version: string
        }
    }
}

export interface IRoot {
    infoData: string;
}

export interface IPromiseResponse {
    stdout: string,
    stderr: string,
}

export interface IPromise {
    (resolve: (value: IPromiseResponse) => void, reject: (reason?: any) => void): void | undefined
}

export interface ICallback {
    (stdout: string, stderr: string, promise?: IPromise): void | string
}

