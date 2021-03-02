const Verifier = require('email-verifier');

import { executeCommand } from '../connection/create';
import { Client } from '../interfaces/interface_client';
import { User } from '../interfaces/interface_user';
import { Validation } from '../interfaces/interface_validation';
import { errorRegister } from './model_registerError';


export const md_new_user = (duser: User): Promise<Validation> => (
    new Promise((resolve, reject) => {
        try {
            let param = [ 
                duser.privilege, 
                duser.email,
                duser.user,
                duser.password
            ];
            let sql = `CALL post_user(?, ?, ?, ?)`;
            executeCommand(sql, param)
            .then((result: any) => {
                if (result && result[0] && result[0][0] && result[0][0]['E'])
                    reject(result[0][0]);
                else
                if (result && result.affectedRows > 0)
                    resolve({S: 'Ok'});
                else
                    reject({E: 'Nenhum resultado encontrado'});       
            })     
        } catch (error) {
           errorRegister(error.message + ' In md_new_user'); 
           reject({E: 'Nenhum resultado encontrado'});
        }
    })
);

export const md_up_user = (duser: User): Promise<Validation> => (
    new Promise((resolve, reject) => {
        try {
            let param = [ 
                duser.privilege || '', 
                duser.user, 
                duser.email, 
                duser.password || '', 
                duser.id_user
            ];
            let sql = `CALL put_user(?, ?, ?, ?, ?)`;
            executeCommand(sql, param).then((result: any) => {
                if (result && result[0] && result[0][0] && result[0][0]['E'])
                    reject(result[0][0])
                else
                if (result && result.affectedRows > 0)
                    resolve({S: 'Ok'})
                else
                    reject({E: 'Nenhum resultado encontrado'});
            }) 
        } catch (error) {
            errorRegister(error.message + ' In md_up_user');
            reject({E: 'Nenhum resultado encontrado'});
        }
    })
);

export const md_del_user = (idUser: number): Promise<Validation> => (
    new Promise((resolve, reject) => {
        try {
            let param = [ idUser ];
            let sql = `CALL del_user(?)`;
            executeCommand(sql, param)
            .then(result => {
                if (result && result[0] && result[0][0] && result[0][0]['E'])
                    reject(result[0][0])
                else
                if (result && result.affectedRows > 0)
                    resolve({S: 'Ok'})
                else
                    reject({E: 'Nenhum resultado encontrado'});
            })
        } catch (error) {
            errorRegister(error.message + ' In md_del_user');
            reject({E: 'Nenhum resultado encontrado'});
        }
    })
);

export const md_list_users = (): Promise<Array<User>> => (
    new Promise((resolve, reject) => {
        try {
            let sql = `CALL list_users()`;
            executeCommand(sql, null).then(result => {
                if (result && result[0])
                    resolve(result[0]);
                else
                    reject({E: 'Nenhum resultado encontrado'});
            })
        } catch (error) {
            errorRegister(error.message + ' In md_list_users');
            reject({E: 'Nenhum resultado encontrado'});
        }
    })
);

export const md_get_user = (userId: number): Promise<Client> => (
    new Promise((resolve, reject) => {
        try {
            let param = [ userId ];
            let sql = `CALL get_user(?)`;
            executeCommand(sql, param).then(result => {
                if (result && result[0] && result[0][0] && result[0][0]['E'])
                    reject(result[0][0])
                else
                if (result && result[0] && result[0][0])
                    resolve(result[0][0])
                else
                    reject({E: 'Nenhum resultado encontrado'});
            })
        } catch (error) {
            errorRegister(error.message + ' In md_get_user');
            reject({E: 'Nenhum resultado encontrado'});
        }
    })
);

export const email_validator = (email: string): Promise<Validation> => (
    new Promise((resolve, rejects) => {
        try {
            let verifier = new Verifier("at_TXNdaNUCbem5N5dqv5DJUZHHGcx2r");
            verifier.verify(email, (err, data) => {
              if (err)
                rejects({ E: 'Email inválido.' });
              else
              if (
                data.formatCheck === 'true' &&
                data.disposableCheck === 'false' &&
                data.dnsCheck === 'true' &&
                data.smtpCheck !== 'false'
              )
                resolve({ S: 'Ok' });
              else
                rejects({ E: 'Email inválido.' });
            });
        } catch (error) {
            errorRegister(error.message + ' In email_validator');
            rejects({ E: 'Erro.' });
        }
    })
)