import { Request, Response } from 'express';
import { DataClient } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';

import { httpMethod, mountParams } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const info_seller = (req: Request, res: Response) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';

        let optionsSellers: HttpOptions = {
            path: `/users/${req.params.seller_id}${param}`,
            access_token: req.session['access_token']
        }

        httpMethod(optionsSellers)
        .then((ret: DataClient) => {
            res.json(ret);
        })
        .catch((error: any) => {
            res.status(500).json(error);
        });
        
    } catch (error) {
        errorRegister(error.message + ' In info_seller')
        res.sendStatus(500);        
    }
}