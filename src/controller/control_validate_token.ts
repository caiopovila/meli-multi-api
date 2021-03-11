import { md_list_client, md_post_client } from '../model/model_client';
import { errorRegister } from '../model/model_registerError';
import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, DOMAIN_FRONT, DOMAIN_BACK, validate_token_bd } from '../model/model_validate_token';

import { httpMethod } from '../model/model_httpReq';
import { NextFunction, Request, Response } from 'express';
import { AccessToken, Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';


export const validate_token = (req: Request, res: Response, next: NextFunction) => {
  try {
    validate_token_bd(req.session['user_id']);
    md_list_client(req.session['user_id'])
    .then((cli) => {
      if (cli.length <= 0) {
        res.status(420).json({ link: `${DOMAIN_BACK}/API/client/link` });
      } else {
        if(!req.session['site_id'])
          req.session['site_id'] = cli[0].site_id;
          
        req.session['access_token'] = cli[0].access_token;
        next();
      }
  })
  } catch (error) {
    errorRegister(error.message + ' In validate_token');
    res.sendStatus(500);
  }
}

export const code_valid = (req: Request, res: Response) => {
  try {
    if (req.query.code && req.session['user_id']) {

      const data = {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        code: req.query.code,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      }
      
      const options: HttpOptions = {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      
      httpMethod(options, data)
      .then((retClient: AccessToken) => {
        let newClient: Client = {};
        newClient.user = req.session['user_id'];
        newClient.access_token = retClient.access_token;
        newClient.refresh_token = retClient.refresh_token;
        newClient.user_id = retClient.user_id;
        md_post_client(newClient).then(() => {
          res.redirect(DOMAIN_FRONT + '/#/home');
        })
        .catch((error) => res.status(500).json(error));
      })
      .catch((error: any) => res.status(500).json(error));

    } else {
      res.status(500).json({E: 'Autorização mal sucedida.'});
    }
  } catch (error) {
    errorRegister(error.message + ' In valid code');
    res.sendStatus(500);
  }
}