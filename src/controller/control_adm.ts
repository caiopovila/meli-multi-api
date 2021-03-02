import { Request, Response } from 'express';
import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { Sites } from '../interfaces/interface_sites';
import { User } from '../interfaces/interface_user';
import { ValidationError, ValidationOk } from '../interfaces/interface_validation';
import * as model_adm from '../model/model_adm';
import { httpMethod } from '../model/model_httpReq';
import { errorRegister } from '../model/model_registerError';


export const new_user = (req: Request, res: Response) => {
    try {
        const requser: User = {
            password: req.body.password ? req.body.password : '',
            user: req.body.user ? req.body.user : '',
            email: req.body.email ? req.body.email : '',
            privilege: 'normal'
        }
        model_adm.email_validator(requser.email)
        .then(() => {
            model_adm.md_new_user(requser)
            .then((ret: ValidationOk) => res.json(ret))
            .catch((error: ValidationError) => res.status(500).json(error));
        })
        .catch((error: ValidationError) => {
            res.status(500).json(error)
        })
    } catch (error: any) {
        errorRegister(error.message + ' In new_user');
        res.sendStatus(500);
    }
}

export const up_user = (req: Request, res: Response) => {
    try {
        const requser: User = {
            password: req.body.password ? req.body.password : '',
            user: req.body.user ? req.body.user : '',
            email: req.body.email ? req.body.email : '',
            id_user: req.session['user_id']
        }
        model_adm.email_validator(requser.email)
        .then(() => {
            model_adm.md_up_user(requser)
            .then((ret: ValidationOk) => res.json(ret))
            .catch((error: ValidationError) => res.status(500).json(error));
        })
        .catch((error: ValidationError) => res.status(500).json(error))
    } catch (error) {
        errorRegister(error.message + ' In up_user');
        res.sendStatus(500);
    }
}

export const del_user = (req: Request, res: Response) => {
    try {
        model_adm.md_del_user(Number(req.params.id) ? Number(req.params.id) : 0)
        .then((ret: ValidationOk) => res.json(ret))
        .catch((err: ValidationError) => res.status(500).json(err))
    } catch (error) {
        errorRegister(error.message + ' In del_user');
        res.sendStatus(500);
    }
}

export const list_users = (req: Request, res: Response) => {
    try {
        model_adm.md_list_users()
        .then((ret: Array<User>) => res.json(ret))
        .catch((err: ValidationError) => res.status(500).json(err))
    } catch (error) {
        errorRegister(error.message + ' In list_users');
        res.sendStatus(500);
    }
}

export const get_user = (req: Request, res: Response) => {
    try {
        model_adm.md_get_user(req.session['user_id'] ? req.session['user_id'] : 0)
        .then((ret: Client) => res.json(ret))
        .catch((err: ValidationError) => res.status(500).json(err))
    } catch (error) {
        errorRegister(error.message + ' In get_user');
        res.sendStatus(500);
    }
}

export const post_site_id = (req: Request, res: Response) => {
    try {
        
        if (req.body.siteId && typeof req.body.siteId == 'string')
            req.session['site_id'] = req.body.siteId;

        res.json({S: 'Ok'});

    } catch (error) {
        errorRegister(error.message + ' In post_site_id');
        res.sendStatus(500);
    }
}

export const list_site = (req: Request, res: Response) => {
    try {

        const options: HttpOptions = {
            path: `https://api.mercadolibre.com/sites`,
            headers: {
                'accept': 'application/json',
            }
        }
        
        httpMethod(options)
        .then((list: Array<Sites>) => {
            let retObj = {
                siteId: req.session['site_id'],
                list
            }
            res.json(retObj);
        })
        .catch((error: any) => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In list_site');
        res.sendStatus(500);
    }
}