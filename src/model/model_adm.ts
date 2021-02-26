const Verifier = require('email-verifier');

import { executeCommand } from '../connection/create';
import { User } from '../interfaces/interface_user';
import { errorRegister } from './model_registerError';


export const md_new_user = (duser: User) => (
    new Promise((resolve, reject) => {
        try {
            let param = [ 
                duser.privilege, 
                duser.email,
                duser.user,
                duser.password
            ];
            let sql = `CALL post_user(?, ?, ?, ?)`;
            executeCommand(sql, param).then((result: any) => {
                if (result && result[0] && result[0][0] && result[0][0]['E'])
                    reject(result[0][0])
                else
                if (result && result.affectedRows > 0)
                    resolve({S: 'Ok'})          
            })     
        } catch (error) {
           errorRegister(error.message + ' In md_new_user'); 
        }
    })
);

export const md_up_user = (duser: User) => (
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
            }) 
        } catch (error) {
            errorRegister(error.message + ' In md_up_user');
        }
    })
);

export const md_del_user = (idUser: number) => (
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
            })
        } catch (error) {
            errorRegister(error.message + ' In md_del_user');
        }
    })
);

export const md_list_users = () => (
    new Promise((resolve, reject) => {
        try {
            let sql = `CALL list_users()`;
            executeCommand(sql, null).then(result => {
                resolve(result)
            })
        } catch (error) {
            errorRegister(error.message + ' In md_list_users');
        }
    })
);

export const md_get_user = (userId: number) => (
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
            })
        } catch (error) {
            errorRegister(error.message + ' In md_get_user');
        }
    })
);

export const email_validator = (email: string) => (
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
        }
    })
)