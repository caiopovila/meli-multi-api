import { md_list_client, md_post_client } from '../model/model_client';
import { errorRegister } from '../model/model_registerError';
import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, DOMAIN_FRONT, DOMAIN_BACK, validate_token_bd } from '../model/model_validate_token';

import { httpMethod } from '../model/model_httpReq';


export const validate_token = (req, res, next) => {
  try {
    validate_token_bd(req.session.user_id)
    .then(() => {
        md_list_client(req.session.user_id).then((cli: any) => {
          if (cli.length <= 0) {
            res.status(420).json({ link: `${DOMAIN_BACK}/API/client/link` });
          } else {
            if(!req.session.site_id)
              req.session.site_id = cli[0].site_id;
              
            req.session.access_token = cli[0].access_token;
            next();
          }
      })
    });
  } catch (error) {
    errorRegister(error.message + ' In validate_token');
    res.sendStatus(500);
  }
}

export const code_valid = async (req, res) => {
  try {
    if (req.query.code && req.session.user_id) {

      const data = JSON.stringify({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        code: req.query.code,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      })
      
      const options = {
        path: '/oauth/token',
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      
      let retClient = await httpMethod(options, data);
      console.log(retClient);
      if (retClient.access_token) {
        retClient.user = req.session.user_id;
        md_post_client(retClient).then(() => {
          res.redirect(DOMAIN_FRONT + '/home');
        });
      }

    } else {
      res.status(500).json({E: 'Autorização mal sucedida.'});
    }
  } catch (error) {
    errorRegister(error.message + ' In valid code');
    res.sendStatus(500);
  }
}