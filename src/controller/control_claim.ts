import { Client } from "../interfaces/interface_client";
import { HttpOptions } from "../interfaces/interface_httpOptons";
import { md_get_client } from "../model/model_client";
import { mountParams, httpMethod } from "../model/model_httpReq";
import { errorRegister } from "../model/model_registerError";


export const search_claim = (req, res) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';

        const dclient: Client = {
            user: req.session.user_id, 
            user_id: req.params.client_id
        }
        
        md_get_client(dclient)
        .then(async(cli: any) => {

            let options: HttpOptions = {
                path: `/v1/claims/search${param}`,
                access_token: cli.access_token
            }

            let claim = await httpMethod(options);
    
            res.json(claim);
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In search_claim');
        res.sendStatus(500);
    }
}