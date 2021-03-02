import { executeCommand } from '../connection/create';
import { Client, DataClient } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { Validation } from '../interfaces/interface_validation';
import { httpMethod } from './model_httpReq';
import { errorRegister } from './model_registerError';
import { dateCalculate } from './model_validate_token';


export const md_list_client = (userId: number): Promise<Array<Client>> => (
    new Promise((resolve, reject) => {
        try {
            let param = [ userId || 0 ];
            let sql = `CALL list_clients(?)`;
            executeCommand(sql, param)
            .then((result: any) => {
                if (!result || !result[0])
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

export const md_get_client = (client: Client): Promise<Client> => (
    new Promise((resolve, reject) => {
        try {
            let param = [ 
                client.user || 0,
                client.user_id || 0
            ];
            let sql = `CALL get_client(?, ?)`;
            executeCommand(sql, param).then((result) => {
                if(result && result[0] && result[0][0]) {
                    if (result[0][0]['E'])
                        reject(result[0][0]);
                    else
                        resolve(result[0][0]);
                } else
                    reject({E: 'Nada encontrado!'});
            });
        } catch (error) {
            errorRegister(error.message + ' In md_get_client');
            reject({E: 'Erro!'});
        }
    })
)

export const md_add_nickname = (client: Client): Promise<Validation> => (
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
                    resolve({S: 'Ok'});
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

export const md_post_client = async (client: Client): Promise<Validation> => (
    new Promise((resolve, reject) => {
        try {
            let param = [
                client.access_token, 
                dateCalculate(), 
                client.refresh_token,  
                client.user_id, 
                client.user
            ];
            let sql = `CALL post_client(?, ?, ?, ?, ?)`;
            executeCommand(sql, param)
            .then((result: any) => {
                if (!result)
                    reject({E: 'Nada encontrado!'});
                else
                if (result.affectedRows && result.affectedRows > 0) {
                    if (!client.nickname)
                        md_get_info_client(client)
                        .then(info => {
                            client.nickname = info.nickname;
                            client.site_id = info.site_id;
                            md_add_nickname(client)
                            .then((ret) => resolve(ret))
                            .catch((error) => reject(error));
                        });
                    else
                        resolve({S: 'Ok'})
                }
                else 
                if (result[0] && result[0][0] && result[0][0]['E'])
                    reject(result[0][0]);
            });
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

export const md_get_info_client = (client: Client, param?: string): Promise<DataClient> => (
    new Promise((resolve, reject) => {
        try {
            const options: HttpOptions = {
                path: `/users/${client.user_id}${param || ''}`,
                access_token: client.access_token
            }
            httpMethod(options)
            .then((response: DataClient) => {
                resolve(response);
            });
        } catch (error) {
            reject(error);
        }
    })
)

export const getBody = (body: any): any => {
    let ret: any = { };

    if (body.identification_type)
        ret.identification_type = body.identification_type;
    if (body.identification_number)
        ret.identification_number = body.identification_number;
    if (body.address)
        ret.address = body.address;
    if (body.state)
        ret.state = body.state;
    if (body.city)
        ret.city = body.city;
    if (body.zip_code)
        ret.zip_code = body.zip_code;
    if (body.phone)
        ret.phone = body.phone;
    if (body.first_name)
        ret.first_name = body.first_name;
    if (body.last_name)
        ret.last_name = body.last_name;
    if (body.nickname)
        ret.nickname = body.nickname;

    return ret;
}