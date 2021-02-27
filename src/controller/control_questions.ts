import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';

import { md_get_client } from "../model/model_client";
import { httpMethod, mountParams } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const list_questions = (req, res) => {
    try {
        let dclient: Client = {
            user: Number(req.session.user_id), 
            user_id: Number(req.params.client_id)
        }
        md_get_client(dclient)
        .then((cli: Client) => {
            let param = req.query ? "?" + mountParams(req.query) : '';

            let options: HttpOptions = {
                path: `/my/received_questions/search${param}`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((questions) => {
                res.json(questions);
            })
            .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In get_my_questions');
        res.sendStatus(500);
    }
}

export const post_answer = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client_id
        }
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = {
                path: `/answers`,
                method: 'POST',
                access_token: cli.access_token
            }
    
            let body = {
                question_id: req.params.question_id,
                text: req.body.text
            };
    
            httpMethod(options, body)
            .then(ret => {
                res.json(ret);
            })
            .catch(error => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In post_answer');
        res.sendStatus(500);
    }
}

export const del_question = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client_id
        }
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = {
                path: `/questions/${req.params.question_id}`,
                method: 'delete',
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
        errorRegister(error.message + ' In del_question');
        res.sendStatus(500);
    }
}

export const bl_questions_add = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client
        };
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = {
                path: `/users/${cli.user_id}/questions_blacklist`,
                method: 'POST',
                access_token: cli.access_token
            }

            let body = {
                user_id: req.body.id_user
            };
    
            httpMethod(options, body)
            .then(add => {
                res.json(add);       
            })
            .catch(() => {
                res.status(500);
            });
    
        })
        .catch(() => {
            res.status(500);
        });
    } catch (error) {
        errorRegister(error.message + ' In blacklist_add');
        res.sendStatus(500);
    }
}

export const bl_questions_rm = (req, res) => {
    try {
        const dclient: Client = {
            user: req.session.user_id, 
            id_client: req.params.client
        };
        md_get_client(dclient)
        .then((cli: Client) => {

            let options: HttpOptions = { 
                path: `/users/${cli.user_id}/questions_blacklist/${req.params.user}`,
                method: 'DELETE',
                access_token: cli.access_token
            };
    
            httpMethod(options)
            .then(ret => {
                res.json(ret);   
            })
            .catch(error => res.status(500).json(error));;
            
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In blacklist_rm');
        res.sendStatus(500);
    }
}

export const get_client_bl_questions = (req, res) => {
    try {   
        const dclient: Client = {
            user: req.session.user_id,
            user_id: req.params.client
        };
        md_get_client(dclient)
        .then((cli: Client) => {

            let optionsBl: HttpOptions = {
                path: `/users/${cli.user_id}/questions_blacklist`,
                access_token: cli.access_token
            }

            httpMethod(optionsBl)
            .then(bl => {
                res.json(bl);
            })
            .catch(error => {
                res.status(500).json(error);
            });

        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In get_client_bl_questions');
        res.sendStatus(500);
    }
}