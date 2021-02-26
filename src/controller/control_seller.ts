import { HttpOptions } from '../interfaces/interface_httpOptons';

import { httpMethod, mountParams } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const info_seller =  async (req, res) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';

        let optionsSellers: HttpOptions = {
            path: `/users/${req.params.seller_id}${param}`,
            access_token: req.session.access_token
        }

        let ret = await httpMethod(optionsSellers);

        res.json(ret);
        
    } catch (error) {
        errorRegister(error.message + ' In info_seller')
        res.sendStatus(500);        
    }
}