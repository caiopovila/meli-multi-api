import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';

import { md_get_client, md_list_client } from "../model/model_client";
import { httpMethod } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';
import { CLIENT_ID } from "../model/model_validate_token";


export const get_list_notif = (req, res) => {
    try {
        md_list_client(req.session.user_id)
        .then((cli: Array<Client>) => {

            let all = [];

            cli.forEach((item: Client) => {
                
                setInterval(() => {
                    let options: HttpOptions = {
                        path: `/missed_feeds?app_id=${CLIENT_ID}`,
                        access_token: item.access_token
                    }

                    httpMethod(options)
                    .then((notf: any) => {
                        if (notf && notf.messages)
                            all.push(notf);
                    })
                    .catch(() => res.status(500));

                }, 100)

            });

            if (all.length > 0)
                res.json(all);
            else
                res.json({E: 'Sem notificações'});

        })
        .catch(() => res.status(500));
    } catch (error) {
        errorRegister(error.message + ' In get_list_notif');
        res.sendStatus(500);
    }
}

export const get_det_notif = (req, res) => {
    try {    
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client
        }
        md_get_client(dclient)
        .then(async(cli: any) => {

            let url;

            if(req.params.topic == 'claims')
                url = `/v1/${req.params.topic}/${req.params.reso}`;
            else
                url = `/${req.params.topic}/${req.params.reso}`;
    
            let options: HttpOptions = {
                path: url,
                access_token: cli.access_token
            }

            let Denotf = await httpMethod(options);
    
            res.json({
                det: Denotf,
                top: req.params.topic
            });
    
        })
        .catch(() => res.status(500));
    } catch (error) {
        errorRegister(error.message + ' In get_det_notif');
        res.sendStatus(500);
    }
}