import { Request, Response } from 'express';
import { Balance } from '../interfaces/interface_balance';
import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { ListNotices } from '../interfaces/interface_notices';
import { TotalQuestions } from '../interfaces/interface_questions';
import { TotalVisits } from '../interfaces/interface_visits';
import * as model_client from '../model/model_client';
import { md_add_nickname, md_get_client } from '../model/model_client';
import { mountParams, httpMethod } from '../model/model_httpReq';
import { errorRegister } from '../model/model_registerError';
import { CLIENT_ID, REDIRECT_URI } from '../model/model_validate_token';


export const AuthUrlMl = `http://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

export const list_client = (req: Request, res: Response) => {
    try {
      model_client.md_list_client(req.session['user_id'])
      .then((clientList) => res.json(clientList))
      .catch((error) => res.status(500).json(error));
    } catch (error) {
      errorRegister(error.message + ' In list_client');
      res.sendStatus(500);
    }
}

export const get_link = (req: Request, res: Response) => {
    try {
      res.redirect(AuthUrlMl);
    } catch (error) {
      errorRegister(error.message + ' In get_link');
      res.sendStatus(500);
    }
}

export const get_notices = (req: Request, res: Response) => {
    try {
      let param = req.query ? mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session['user_id']),
        user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
      };
      
      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        
        const options: HttpOptions = {
          path: `/communications/notices?${param}`,
          access_token: retCLient.access_token
        };
      
        httpMethod(options)
        .then((ret: ListNotices) => {
          res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));
      
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_notices');
      res.sendStatus(500);
    }
}

export const get_total_visits = (req: Request, res: Response) => {
    try {
      let param = req.query ? "?" + mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session['user_id']),
        user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
      };

      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        const options: HttpOptions = {
          path: `/users/${retCLient.user_id}/items_visits${param}`,
          access_token: retCLient.access_token
        };
    
        httpMethod(options)
        .then((ret: TotalVisits) => {
          res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));

      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_total_visits');
      res.sendStatus(500);
    }
}

export const get_info_client = (req: Request, res: Response) => {
    try {
      let param = req.query ? "?" + mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session['user_id']),
        user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
      };

      model_client.md_get_client(client)
      .then((retCLient) => {
          model_client.md_get_info_client(retCLient, param)
          .then(ret => {
            res.json(ret);
          })
          .catch(error => res.status(500).json(error))
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_info_client');
      res.sendStatus(500);
    }
}

export const get_balance_client = (req: Request, res: Response) => {
    try {
      let client: Client = {
        user: Number(req.session['user_id']),
        user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
      };

      model_client.md_get_client(client)
      .then((retCLient) => {
          const options: HttpOptions = {
            path: `/users/${retCLient.user_id}/mercadopago_account/balance`,
            access_token: retCLient.access_token
          };

          httpMethod(options)
          .then((ret: Balance) => {
            res.json(ret);
          })
          .catch((error: any) => res.status(500).json(error));

      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_balance_client');
      res.sendStatus(500);
    }
}

export const get_total_questions_client = (req: Request, res: Response) => {
    try {
      let param = req.query ? "?" + mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session['user_id']),
        user_id: Number(req.params.client_id) ? Number(req.params.client_id) : 0
      };

      model_client.md_get_client(client)
      .then((retCLient) => {
          const options: HttpOptions = {
            path: `/users/${retCLient.user_id}/contacts/questions${param}`,
            access_token: retCLient.access_token
          };

          httpMethod(options)
          .then((ret: TotalQuestions) => {
            res.json(ret);
          })
          .catch((error: any) => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_balance_client');
      res.sendStatus(500);
    }
}

export const up_client = (req: Request, res: Response) => {
  try {
      const dclient: Client = {
          user: req.session['user_id'], 
          user_id: Number(req.params.client) ? Number(req.params.client) : 0
      };
      md_get_client(dclient)
      .then((cli) => {
        let body = model_client.getBody(req.body);

        let options: HttpOptions = {
            path: `/users/${cli.user_id}`,
            method: 'PUT',
            access_token: cli.access_token
        }

        httpMethod(options, body)
        .then((at: any) => {
          res.json(at);
        })
        .catch((error: any) => res.status(500).json(error));

      })
      .catch((err) => {
          res.status(500).json(err);
      });
  } catch (error) {
      errorRegister(error.message + ' In up_client');
      res.sendStatus(500);
  }
}

export const set_nick = (req: Request, res: Response) => {
  try {
    let cli: Client = {
        user_id: Number(req.params.user_id) ? Number(req.params.user_id) : 0,
        user: req.session['user_id'],
        nickname: req.body.nickname ? req.body.nickname : ''
    };
    md_add_nickname(cli)
    .then(ret => {
      res.json(ret);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  } catch (error) {
    errorRegister(error.message + ' In set_nick');
    res.sendStatus(500);
  }
}