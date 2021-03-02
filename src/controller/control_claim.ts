import { Request, Response } from "express";
import { DataSearchClaim } from "../interfaces/interface_claim";
import { Client } from "../interfaces/interface_client";
import { HttpOptions } from "../interfaces/interface_httpOptons";
import { md_get_client } from "../model/model_client";
import { mountParams, httpMethod } from "../model/model_httpReq";
import { errorRegister } from "../model/model_registerError";


export const search_claim = (req: Request, res: Response) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        }
        
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = {
                path: `/v1/claims/search${param}`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((claim: DataSearchClaim) => {
                res.json(claim);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In search_claim');
        res.sendStatus(500);
    }
}