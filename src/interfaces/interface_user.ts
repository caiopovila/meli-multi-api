interface Privilege_user {
    privilege?: string
}

export interface User extends Privilege_user {
    id_user?: number,
    user: string,
    email?: string,
    password: string
}