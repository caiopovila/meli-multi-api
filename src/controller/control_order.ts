import { Request, Response } from 'express';
import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { BlackListOrder, SearchOrder } from '../interfaces/interface_order';

import { md_get_client } from "../model/model_client";
import { httpMethod } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const list_order = (req: Request, res: Response) => {
    try {
        let param = mountParamOrder(req.query);

        let client: Client = {
            user: Number(req.session['user_id']),
            user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
        };

        md_get_client(client)
        .then((retClient) => {

            let options: HttpOptions = {
                path: `/orders/search?seller=${retClient.user_id}${param}`,
                access_token: retClient.access_token
            }
    
            httpMethod(options)
            .then((retOrders: SearchOrder) => {
                res.json(retOrders);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In list_order')
        res.sendStatus(500);
    }
}

export const get_client_bl_orders = (req: Request, res: Response) => {
    try {   
        const dclient: Client = {
            user: req.session['user_id'],
            user_id: Number(req.params.client) ? Number(req.params.client) : 0
        };
        md_get_client(dclient)
        .then((cli) => {

            let optionsBl: HttpOptions = {
                path: `/users/${cli.user_id}/order_blacklist`,
                access_token: cli.access_token
            }

            httpMethod(optionsBl)
            .then((bl: Array<BlackListOrder>) => {
                res.json(bl);
            })
            .catch((error: any) => {
                res.status(500).json(error);
            });

        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In get_client_bl_orders');
        res.sendStatus(500);
    }
}

export const bl_orders_add = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params.client) ? Number(req.params.client) : 0
        };
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                path: `/users/${cli.user_id}/order_blacklist`,
                method: 'POST',
                access_token: cli.access_token
            }

            let body = {
                user_id: 'user_id' in req.body ? req.body.user_id : ''
            };
    
            httpMethod(options, body)
            .then((add: any) => {
                res.json(add);       
            })
            .catch((error: any) => {
                res.status(500).json(error);
            });
    
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In bl_orders_add');
        res.sendStatus(500);
    }
}

export const bl_orders_rm = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params.client) ? Number(req.params.client) : 0
        };
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = { 
                path: `/users/${cli.user_id}/order_blacklist/${req.params.user}`,
                method: 'DELETE',
                access_token: cli.access_token
            };
    
            httpMethod(options)
            .then((ret: any) => {
                res.json(ret);  
            })
            .catch((error: any) => {
                res.status(500).json(error);
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In bl_orders_rm');
        res.sendStatus(500);
    }
}

const mountParamOrder = (query: any): string => {
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
