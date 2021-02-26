import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';

import { md_get_client } from "../model/model_client";
import { httpMethod } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const list_order = async (req, res) => {
    try {
        let param = mountParamOrder(req.query);

        let client: Client = {
            user: Number(req.session.user_id),
            user_id: Number(req.params.client_id)
        };

        md_get_client(client)
        .then(async(retClient: Client) => {

            let options: HttpOptions = {
                path: `/orders/search?seller=${retClient.user_id}${param}`,
                access_token: retClient.access_token
            }
    
            let retOrders = await httpMethod(options);
    
            res.json(retOrders);
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In list_order')
        res.sendStatus(500);
    }
}

export const get_client_bl_orders = (req, res) => {
    try {   
        const dclient: Client = {
            user: req.session.user_id,
            user_id: req.params.client
        };
        md_get_client(dclient)
        .then(async(cli: any) => {

            let optionsBl: HttpOptions = {
                path: `/users/${cli.user_id}/order_blacklist`,
                access_token: cli.access_token
            }

            let bl = await httpMethod(optionsBl);

            res.json(bl);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In get_client_bl_orders');
        res.sendStatus(500);
    }
}

export const bl_orders_add = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client
        };
        md_get_client(dclient)
        .then(async(cli: any) => {

            let options: HttpOptions = {
                path: `/users/${cli.user_id}/order_blacklist`,
                method: 'POST',
                access_token: cli.access_token
            }

            let body = {
                user_id: req.body.id_user
            };
    
            let add = await httpMethod(options, body);
    
            res.json(add);       
        })
        .catch(() => {
            res.status(500);
        });
    } catch (error) {
        errorRegister(error.message + ' In bl_orders_add');
        res.sendStatus(500);
    }
}

export const bl_orders_rm = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client
        };
        md_get_client(dclient)
        .then(async(cli: any) => {

            let options: HttpOptions = { 
                path: `/users/${cli.user_id}/order_blacklist/${req.params.user}`,
                method: 'DELETE',
                access_token: cli.access_token
            };
    
            let ret = await httpMethod(options);
            
            res.json(ret);   
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In bl_orders_rm');
        res.sendStatus(500);
    }
}

function mountParamOrder(query: any) {
    let param = '';

    if (query.q)
        param += `&q=${query.q}`;

    if (query.offset)
        param += `&offset=${query.offset}`;

    if (query.limit)
        param += `&limit=${query.limit}`;

    if (query.from)
        param += `&order.date_created.from=${query.from}T00:00:00.000-00:00`;

    if (query.to)
        param += `&order.date_created.from=${query.to}T00:00:00.000-00:00`;

    if (query.status)
        param += `&order.status=${query.status}`;

    return param;
}
