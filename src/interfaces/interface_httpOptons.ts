export interface HttpOptions {
    hostname?: string,
    port?: number,
    path?: string,
    method?: MethodType,
    headers?: any,
    access_token?: string
}

export type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTION';