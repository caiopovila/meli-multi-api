import { AccessToken, Client } from '../interfaces/interface_client';
import { md_del_client, md_list_client, md_post_client } from './model_client';
import { httpMethod } from './model_httpReq';
import { errorRegister } from './model_registerError';

require('dotenv').config();


export const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, DOMAIN_FRONT, DOMAIN_BACK } = process.env;

export const validate_token_bd = (user_id: number): void => {
    try {
        md_list_client(user_id).then((listClient) => {
            listClient.forEach((client) => {
                
                if (new Date() >= client.expires_in) {

                    const options = {
                        path: `/oauth/token?grant_type=refresh_token&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${client.refresh_token}`,
                        method: 'POST',
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/x-www-form-urlencoded'
                        }
                    }

                    httpMethod(options)
                    .then((retCli: AccessToken) => {
                        if (retCli.access_token) {
                            let clientRet: Client = client;
                            clientRet.access_token = retCli.access_token;
                            clientRet.refresh_token = retCli.refresh_token;
                            md_post_client(clientRet)
                            .catch(error => {
                                errorRegister(error.message + ' In validate_token db');
                            });
    
                        } else {
                            md_del_client(client)
                            .catch(error => {
                                errorRegister(error.message + ' In validate_token db');
                            });
                        }
                    });
                }      
            });
        })
    } catch (error) {
        errorRegister(error.message + ' In validate_token db');
    }
}

export const dateCalculate = (): Date => {
    const date = new Date();
    const time_threshold = 6;
    date.setHours(date.getHours() + time_threshold, 0, 0, 0);
    return date;
}