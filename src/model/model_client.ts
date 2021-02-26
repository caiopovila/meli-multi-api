import { executeCommand } from '../connection/create';
import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { httpMethod } from './model_httpReq';
import { errorRegister } from './model_registerError';
import { dateCalculate } from './model_validate_token';


export const md_list_client = (userId: number) => (
    new Promise((resolve, reject) => {
        try {
            let param = [ userId || 0 ];
            let sql = `CALL list_clients(?)`;
            executeCommand(sql, param).then((result: any) => {
                if (!result)
                    reject({E: 'Nada encontrado!'});
                else
                    resolve(result[0]);
            });
        } catch (error) {
            errorRegister(error.message + ' In md_list_client');
            reject({E: 'Erro!'});
        }
    })
)

export const md_get_client = (client: Client) => (
    new Promise((resolve, reject) => {
        try {
            let param = [ 
                client.user || 0,
                client.user_id || 0
            ];
            let sql = `CALL get_client(?, ?)`;
            executeCommand(sql, param).then((result) => {
                if (!result)
                    reject({E: 'Nada encontrado!'});
                else  
                if(result[0][0]['E'])
                    reject(result[0][0]);
                else
                    resolve(result[0][0]);
            });
        } catch (error) {
            errorRegister(error.message + ' In md_get_client');
            reject({E: 'Erro!'});
        }
    })
)

export const md_add_nickname = (client: Client) => (
    new Promise((resolve, reject) => {
        try {
            let param = [
                client.nickname || '',
                client.site_id,
                client.user || 0,
                client.user_id || 0
            ];
            let sql = `CALL post_nick_in_client(?, ?, ?, ?)`;
            executeCommand(sql, param).then(result => {
                if (!result)
                    reject({E: 'Nada encontrado!'});
                else
                if (result.affectedRows > 0)
                    resolve(result);
                else 
                if (result[0][0]['E'])
                    reject(result[0][0])
            });
        } catch (error) {
            errorRegister(error.message + ' In md_add_nickname');
            reject({E: 'Erro!'});
        }
    })
)

export const md_post_client = async (client: Client) => (
    new Promise((resolve, reject) => {
        try {
            if (client.status == 400) {
                reject(client);
            } else {
                let param = [
                    client.access_token, 
                    dateCalculate(), 
                    client.refresh_token,  
                    client.user_id, 
                    client.user
                ];
                let sql = `CALL post_client(?, ?, ?, ?, ?)`;
                executeCommand(sql, param).then(async(result: any) => {
                    if (!result)
                        reject({E: 'Nada encontrado!'});
                    else
                    if (result.affectedRows > 0) {
                        let cliInfo: Client = await md_get_info_client(client);
                        client.nickname = cliInfo.nickname;
                        client.site_id = cliInfo.site_id;
                        md_add_nickname(client)
                        .then(() => resolve(result));
                    }
                    else 
                    if (result[0][0]['E'])
                        reject(result[0][0]);
                });
            }
        } catch (error) {
            errorRegister(error.message + ' In md_set_client');
            reject({E: 'Erro!'});
        }
    })
)

export const md_del_client = (client: Client) => (
    new Promise((resolve, reject) => {
        try {
            let param = [
                client.id_client,
                client.user
            ]
            let sql = `CALL del_client(?, ?)`;
            executeCommand(sql, param).then(result => {
                if (!result)
                    reject({E: 'Nada encontrado!'});
                else
                if (result.affectedRows > 0)
                    resolve('Ok');
                else 
                if (result[0][0]['E']) {
                  errorRegister(result[0][0]['E'] + ' In md_del_client');
                  reject(result[0][0]);
                }
            });
        } catch (error) {
            errorRegister(error.message + ' In md_del_client');
            reject({E: 'Erro!'});
        }
    })
)

export const md_get_info_client = (client: Client, param?: string) => (
    new Promise(async (resolve, reject) => {
        try {
            let options: HttpOptions = {
                path: `/users/${client.user_id}${param || ''}`,
                access_token: client.access_token
            }
            resolve(await httpMethod(options));
        } catch (error) {
            reject(error);
        }
    })
)