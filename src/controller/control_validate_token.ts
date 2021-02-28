import { md_list_client, md_post_client } from '../model/model_client';
import { errorRegister } from '../model/model_registerError';
import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, DOMAIN_FRONT, DOMAIN_BACK, validate_token_bd } from '../model/model_validate_token';

import { httpMethod } from '../model/model_httpReq';
import { Client } from '../interfaces/interface_client';


export const validate_token = (req, res, next) => {
  try {
    validate_token_bd(req.session.user_id);
    md_list_client(req.session.user_id)
    .then((cli: Array<Client>) => {
      if (cli.length <= 0) {
        res.status(420).json({ link: `${DOMAIN_BACK}/API/client/link` });
      } else {
        if(!req.session.site_id)
          req.session.site_id = cli[0].site_id;
          
        req.session.access_token = cli[0].access_token;
        next();
      }
  })
  } catch (error) {
    errorRegister(error.message + ' In validate_token');
    res.sendStatus(500);
  }
}

export const code_valid = (req, res) => {
  try {
    if (req.query.code && req.session.user_id) {

      const data = {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        code: req.query.code,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      }
      
      const options = {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      
      httpMethod(options, data)
      .then(retClient => {

        console.log(retClient);

        if (retClient.access_token) {

          retClient.user = req.session.user_id;
          md_post_client(retClient).then(() => {
            res.redirect(DOMAIN_FRONT + '/#/home');
          });

        } else {
          errorRegister(retClient.message ? retClient.message : 'acesso negado' + ' In valid code');
          res.sendStatus(500);
        }
      });

    } else {
      res.status(500).json({E: 'Autorização mal sucedida.'});
    }
  } catch (error) {
    errorRegister(error.message + ' In valid code');
    res.sendStatus(500);
  }
}