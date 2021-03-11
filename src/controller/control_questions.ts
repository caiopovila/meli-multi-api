import { Request, Response } from 'express';
import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { BlackListQuestion, Question, SearchQuestions } from '../interfaces/interface_questions';

import { md_get_client } from "../model/model_client";
import { httpMethod, mountParams } from "../model/model_httpReq";
import { errorRegister } from '../model/model_registerError';


export const list_questions = (req: Request, res: Response) => {
    try {
        let dclient: Client = {
            user: Number(req.session['user_id']), 
            user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
        }
        md_get_client(dclient)
        .then((cli) => {
            let param = req.query ? "?" + mountParams(req.query) : '';

            let options: HttpOptions = {
                path: `/my/received_questions/search${param}`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((questions: SearchQuestions) => {
                res.json(questions);
            })
            .catch((error: any) => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
    } catch (error) {
        errorRegister(error.message + ' In get_my_questions');
        res.sendStatus(500);
    }
}

export const post_answer = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
        }
        md_get_client(dclient)
        .then((cli) => {

            const options: HttpOptions = {
                path: `/answers`,
                method: 'POST',
                access_token: cli.access_token
            }
    
            let body = {
                question_id: req.params.question_id,
                text: req.body.text
            };
    
            httpMethod(options, body)
            .then((ret: Question) => {
                res.json(ret);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In post_answer');
        res.sendStatus(500);
    }
}

export const del_question = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
        }
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                path: `/questions/${req.params.question_id}`,
                method: 'DELETE',
                access_token: cli.access_token
            }
    
            httpMethod(options)
            .then((ret: Array<string>) => {
                res.json(ret);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));


    } catch (error) {
        errorRegister(error.message + ' In del_question');
        res.sendStatus(500);
    }
}

export const bl_questions_add = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params.client) ? Number(req.params.client) : 0
        };
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                path: `/users/${cli.user_id}/questions_blacklist`,
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
        errorRegister(error.message + ' In bl_questions_add');
        res.sendStatus(500);
    }
}

export const bl_questions_rm = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params.client) ? Number(req.params.client) : 0
        };
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = { 
                path: `/users/${cli.user_id}/questions_blacklist/${req.params.user}`,
                method: 'DELETE',
                access_token: cli.access_token
            };
    
            httpMethod(options)
            .then((ret: any) => {
                res.json(ret);   
            })
            .catch((error: any) => res.status(500).json(error));
            
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        errorRegister(error.message + ' In bl_questions_rm');
        res.sendStatus(500);
    }
}

export const get_client_bl_questions = (req: Request, res: Response) => {
    try {   
        const dclient: Client = {
            user: req.session['user_id'],
            user_id: Number(req.params.client) ? Number(req.params.client) : 0
        };
        md_get_client(dclient)
        .then((cli) => {

            let optionsBl: HttpOptions = {
                path: `/users/${cli.user_id}/questions_blacklist`,
                access_token: cli.access_token
            }

            httpMethod(optionsBl)
            .then((bl: BlackListQuestion) => {
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
        errorRegister(error.message + ' In get_client_bl_questions');
        res.sendStatus(500);
    }
}