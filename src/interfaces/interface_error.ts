export interface Error {
    message: string | Array<any>,
    error: string | Array<any>,
    status: number,
    cause: string | Array<any> | any
}