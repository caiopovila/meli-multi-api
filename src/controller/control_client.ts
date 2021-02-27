import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import * as model_client from '../model/model_client';
import { md_add_nickname, md_get_client } from '../model/model_client';
import { mountParams, httpMethod } from '../model/model_httpReq';
import { errorRegister } from '../model/model_registerError';
import { CLIENT_ID, REDIRECT_URI } from '../model/model_validate_token';


export const AuthUrlMl = `http://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

export const list_client = (req, res) => {
    try {
      model_client.md_list_client(Number(req.session.user_id))
      .then(clientList => res.json(clientList))
      .catch(error => res.status(500).json(error));
    } catch (error) {
      errorRegister(error.message + ' In list_client');
      res.sendStatus(500);
    }
}

export const get_link = (req, res) => {
    try {
      res.redirect(AuthUrlMl);
    } catch (error) {
      errorRegister(error.message + ' In get_link');
      res.sendStatus(500);
    }
}

export const get_notices = (req, res) => {
    try {
      let param = req.query ? mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session.user_id),
        user_id: Number(req.params.client_id)
      };
      
      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        
        const options: HttpOptions = {
          path: `/communications/notices?${param}`,
          access_token: retCLient.access_token
        };
      
        httpMethod(options)
        .then(ret => {
          res.json(ret);
        })
        .catch(error => res.status(500).json(error));
      
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_notices');
      res.sendStatus(500);
    }
}

export const get_total_visits = (req, res) => {
    try {
      let param = req.query ? "?" + mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session.user_id) || 0,
        user_id: Number(req.params.client_id)
      };

      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        if (retCLient) {
          const options: HttpOptions = {
            path: `/users/${retCLient.user_id}/items_visits${param}`,
            access_token: retCLient.access_token
          };
      
          httpMethod(options)
          .then(ret => {
            res.json(ret);
          })
          .catch(error => res.status(500).json(error));

        } else
            res.sendStatus(500);
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_total_visits');
      res.sendStatus(500);
    }
}

export const get_info_client = (req, res) => {
    try {
      let param = req.query ? "?" + mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session.user_id),
        user_id: Number(req.params.client_id)
      };

      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        if (retCLient) {
          model_client.md_get_info_client(retCLient, param)
          .then(ret => {
            res.json(ret);
          })
          .catch(error => res.status(500).json(error))

        } else
            res.sendStatus(500);
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_info_client');
      res.sendStatus(500);
    }
}

export const get_balance_client = (req, res) => {
    try {
      let client: Client = {
        user: Number(req.session.user_id),
        user_id: Number(req.params.client_id)
      };

      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        if (retCLient) {
          const options: HttpOptions = {
            path: `/users/${retCLient.user_id}/mercadopago_account/balance`,
            access_token: retCLient.access_token
          };

          httpMethod(options)
          .then(ret => {
            res.json(ret);
          })
          .catch(error => res.status(500).json(error));

        } else
            res.sendStatus(500);
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_balance_client');
      res.sendStatus(500);
    }
}

export const get_total_questions_client = (req, res) => {
    try {
      let param = req.query ? "?" + mountParams(req.query) : '';

      let client: Client = {
        user: Number(req.session.user_id),
        user_id: Number(req.params.client_id)
      };

      model_client.md_get_client(client)
      .then((retCLient: Client) => {
        if (retCLient) {
          const options: HttpOptions = {
            path: `/users/${retCLient.user_id}/contacts/questions${param}`,
            access_token: retCLient.access_token
          };

          httpMethod(options)
          .then(ret => {
            res.json(ret);
          })
          .catch(error => res.status(500).json(error));
          
        } else
            res.sendStatus(500);
      })
      .catch(error => res.status(500).json(error))
    } catch (error) {
      errorRegister(error.message + ' In get_balance_client');
      res.sendStatus(500);
    }
}

export const up_client = (req, res) => {
  try {
      const dclient: Client = {
          user: req.session.user_id, 
          user_id: req.params.client
      };
      md_get_client(dclient)
      .then((cli: Client) => {
  /* 
          let body = {
              identification_type: req.body.identification_type,
              identification_number: req.body.identification_number,
              address: req.body.address,
              state: req.body.state,
              city: req.body.city,
              zip_code: req.body.zip_code,
              phone:{
                  area_code: req.body.area_code,
                  number: req.body.number,
                  extension: req.body.extension
              },
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              nickname: req.body.nickname
          }; */
  
          let options: HttpOptions = {
              path: `/users/${cli.user_id}`,
              method: 'PUT',
              access_token: cli.access_token
          }

          httpMethod(options, req.body)
          .then(at => {
            res.json(at);
          })
          .catch(error => res.status(500).json(error));
  
      })
      .catch(() => {
          res.status(500);
      });
  } catch (error) {
      errorRegister(error.message + ' In up_client');
      res.sendStatus(500);
  }
}

export const set_nick = (req, res) => {
  try {
    let cli: Client = {
        user_id: req.params.user_id,
        user: req.session.user_id,
        nickname: req.body.nickname
    }
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