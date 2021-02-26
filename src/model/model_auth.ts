import { executeCommand } from "../connection/create";
import { User } from "../interfaces/interface_user";
import { errorRegister } from "./model_registerError";

import * as crypto from 'crypto';


export const auth = (user: User) => (
    new Promise((resolve, reject) => {
       try {
          let param = [ user.user, user.password ];
          let sql = `CALL auth_user(?, ?)`;
          executeCommand(sql, param).then((result: any) => {
             if(result && result[0] && result[0][0] && result[0][0]['E'])
               reject(result[0][0]);
             else if(result && result[0] && result[0][0])
               resolve(result[0][0]);
            else
               reject({E: 'Erro! login faliu!'});
          });
       } catch (error) {
         errorRegister(error.message + ' In auth');
       }
    })
);
 

export const convertBase64 = (authBase64: string): User => {
   try {
      let conv = Buffer.from(authBase64, 'base64');
      let str = conv.toString('utf-8');
      let ar: string[] = str.split(':');
      let business: User = {
         user: ar[0],
         password: ar[1]
      }
      return business;  
   } catch (error) {
      errorRegister(error.message + ' In convertBase64');
   }
}

export const hashGenerator = (business: User): string => {
   try {
      const key = crypto.pbkdf2Sync(Date.now() % business.id_user + business.user, 'salt', 100000, 64, 'sha512');
      return key.toString('hex');  
   } catch (error) {
      errorRegister(error.message + ' In hashGenerator');
   }
}
 