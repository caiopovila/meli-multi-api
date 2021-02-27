import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';

import { md_get_client } from "../model/model_client";
import { httpMethod, mountParams } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const get_message = (req, res) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';

        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.id
        }
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = {
                path: `/messages/packs/${req.params.pack}/sellers/${cli.user_id}${param}`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then(msg => {

                res.json({
                    msg,
                    id: req.params.id,
                    buyer_id: req.params.buyer
                });
            })
            .catch(error => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In get_message');
        res.sendStatus(500);
    }
}

export const get_attachments = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.id
        }
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = {
                path: `/messages/attachments/${req.params.file}`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then(ret => {
                res.json(ret);
            })
            .catch(error => res.status(500).json(error));
            
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In get_attachments');
        res.sendStatus(500);
    }
}

export const post_message = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.body.user.user_id
        }
        md_get_client(dclient)
        .then(async(cli: any) => {

            let body = {
                from: {
                    user_id: cli.user_id,
                    email: req.body.user.email
                },
                to: {
                    user_id: req.body.buyer
                },
                text: req.body.text
            };
    
            let options: HttpOptions = {
                path: `/messages/${req.body.path}`,
                method: 'POST',
                access_token: cli.access_token
            }

            httpMethod(options, body)
            .then(post => {
                res.json(post);
            })
            .catch(error => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In post_message');
        res.sendStatus(500);
    }
}