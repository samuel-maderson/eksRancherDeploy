export interface Iinfo {
    nodeType: string,
    nodesMin: number,
    nodesMax: number,
    clusterName: string,
    AWSCredentials: {
        aws_access_key_id: string,
        aws_secret_access_key: string,
        aws_default_region: string
    }
}

export interface IRoot {
    infoData: string;
}

export interface ICallback {
    (stdout: string, stderr: string): void | string
}