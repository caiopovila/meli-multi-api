import { HttpOptions } from '../interfaces/interface_httpOptons';
import { User } from '../interfaces/interface_user';
import * as model_adm from '../model/model_adm';
import { httpMethod } from '../model/model_httpReq';
import { errorRegister } from '../model/model_registerError';


export const new_user = (req, res) => {
    try {
        model_adm.email_validator(req.body.email)
        .then((validation: any) => {
            if (validation && validation.S) {
                const requser: User = {
                    password: req.body.password,
                    user: req.body.user,
                    email: req.body.email,
                    privilege: 'normal'
                }
                model_adm.md_new_user(requser)
                .then(ret => res.json(ret))
                .catch(error => res.status(500).json(error));
            } else
                res.status(500).json({E: 'Email inválido.'})
        }).catch(error => res.status(500).json(error))
    } catch (error) {
        errorRegister(error.message + ' In new_user');
        res.sendStatus(500);
    }
}

export const up_user = (req, res) => {
    try {
        model_adm.email_validator(req.body.email)
        .then((validation: any) => {
            if (validation && validation.S) {
                const requser: User = {
                        password: req.body.password,
                        user: req.body.user,
                        email: req.body.email,
                        id_user: req.session.user_id
                }
                model_adm.md_up_user(requser)
                .then(ret => res.json(ret))
                .catch(error => res.status(500).json(error));
            } else
                res.status(500).json({E: 'Email inválido.'})
    }).catch(error => res.status(500).json(error))
    } catch (error) {
        errorRegister(error.message + ' In up_user');
        res.sendStatus(500);
    }
}

export const del_user = (req, res) => {
    try {
        model_adm.md_del_user(req.params.id)
        .then(ret => res.json(ret))
        .catch(err => res.status(500).json(err))
    } catch (error) {
        errorRegister(error.message + ' In del_user');
        res.sendStatus(500);
    }
}

export const list_users = (req, res) => {
    try {
        model_adm.md_list_users()
        .then(ret => res.json(ret))
        .catch(err => res.status(500).json(err))
    } catch (error) {
        errorRegister(error.message + ' In list_users');
        res.sendStatus(500);
    }
}

export const get_user = (req, res) => {
    try {
        model_adm.md_get_user(req.session.user_id)
        .then(ret => res.json(ret))
        .catch(err => res.status(500).json(err))
    } catch (error) {
        errorRegister(error.message + ' In get_user');
        res.sendStatus(500);
    }
}

export const post_site_id = (req, res) => {
    try {
        
        req.session.site_id = req.body.siteId;

        res.json({S: 'Ok'});

    } catch (error) {
        errorRegister(error.message + ' In post_site_id');
        res.sendStatus(500);
    }
}

export const list_site = (req, res) => {
    try {

        const options: HttpOptions = {
            path: `https://api.mercadolibre.com/sites`,
            headers: {
                'accept': 'application/json',
            }
        }

        httpMethod(options).then(list => {
            let retObj = {
                siteId: req.session.site_id,
                list
            }

            res.json(retObj);
        });

    } catch (error) {
        errorRegister(error.message + ' In list_site');
        res.sendStatus(500);
    }
}