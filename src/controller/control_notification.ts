import { Request, Response } from 'express';
import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { MessagesNotification } from '../interfaces/interface_notification';

import { md_get_client, md_list_client } from "../model/model_client";
import { httpMethod } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';
import { CLIENT_ID } from "../model/model_validate_token";


export const get_list_notif = (req: Request, res: Response) => {
    try {
        md_list_client(req.session['user_id'])
        .then((cli) => {

            let all: Array<MessagesNotification> = [];

            try {
             
                cli.forEach((item) => {
                    
                    const options: HttpOptions = {
                        path: `/missed_feeds?app_id=${CLIENT_ID}`,
                        access_token: item.access_token
                    }

                    httpMethod(options)
                    .then((notf: MessagesNotification) => {
                        all.push(notf);
                    })
                    .catch((error: any) => res.status(500).json(error));

                });

            } finally {

                if (all.length > 0)
                    res.json(all);
                else
                    res.json({E: 'Sem notificações'});   
            }

        })
        .catch((error) => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In get_list_notif');
        res.sendStatus(500);
    }
}

export const get_det_notif = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            id_client: Number(req.params.client) ? Number(req.params.client) : 0
        }
        md_get_client(dclient)
        .then((cli) => {

            let url = '';

            if(req.params.topic === 'claims')
                url = `/v1/${req.params.topic}/${req.params.reso}`;
            else
                url = `/${req.params.topic}/${req.params.reso}`;
    
            let options: HttpOptions = {
                path: url,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((Denotf: any)  => {

                res.json({
                    detail: Denotf,
                    topic: req.params.topic
                });
        
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch((error) => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In get_det_notif');
        res.sendStatus(500);
    }
}