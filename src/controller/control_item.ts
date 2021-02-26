import { Client } from '../interfaces/interface_client';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { md_get_client } from '../model/model_client';

import { httpMethod, mountParams } from "../model/model_httpReq";
import { mountBody } from '../model/model_item';
import { errorRegister } from '../model/model_registerError';


export const get_item = async (req, res) => {
    try {

        const options: HttpOptions = {
            path: `/items/${req.params.id}`,
            access_token: req.session.access_token
        }

        let item: any = await httpMethod(options);


        const optionsDesc: HttpOptions = {
            path: `/items/${req.params.id}/descriptions`,
            access_token: req.session.access_token
        }

        let desc: any = await httpMethod(optionsDesc);

        res.json({
            description: desc,
            data: item
        });

    } catch (error) {
        errorRegister(error.message + ' In get_item');
        res.sendStatus(500);
    }
}

export const get_listing_types = async (req, res) => {
  try {

        const optionslisting_types: HttpOptions = {
            path: `/sites/${req.session.site_id}/listing_types`,
            access_token: req.session.access_token
        }

        let listing_types: any = await httpMethod(optionslisting_types);

        res.json(listing_types);

  } catch (error) {
    errorRegister(error.message + ' In get_listing_types');
    res.sendStatus(500);
  }  
}

export const get_currencies = async (req, res) => {
  try {

    const optionsCurrencies: HttpOptions = {
        path: `/currencies`,
        access_token: req.session.access_token
    }

    let currencies: any = await httpMethod(optionsCurrencies);

    res.json(currencies);

  } catch (error) {
    errorRegister(error.message + ' In get_currencies');
    res.sendStatus(500);
  }  
}

export const post_clone_item = (req, res) => {
    try {
        if (req.body && req.body.client) {

            const dclient: Client = {
                user: req.session.user_id, 
                user_id: req.body.client
            }
        
            md_get_client(dclient).then((clientdb: Client) => {
                let body;

                if (req.body.item) {
                    body = mountBody(req.body.item);
                } else
                    res.status(500).json({E: 'item não informado.'});


                const optionsPostItem: HttpOptions = {
                    path: `/items`,
                    method: 'POST',
                    access_token: clientdb.access_token
                }

                httpMethod(optionsPostItem, body).then(responsePostItem => {
                    res.json({ user: clientdb.nickname, response:  responsePostItem});
                });
            });
        } else
            res.status(500).json({E: 'Associado(s) não informado(s).'});

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In post_clone_item');
        res.sendStatus(500);
    }
}

export const post_img = (req, res) => {
    try {
        console.log(req.body, req.files);
        
        let pictures: any = [];

        if (req.files)
            req.files.forEach(item => {
                pictures.push({source: `${req.protocol}://${req.get('host')}/img/${item.filename}`})
            });

        res.json(pictures);

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In post_img');
        res.sendStatus(500);
    }
}
/* 
export const post_item = (req, res) => {
    try {
        let ret: any = [];

        if (Array.isArray(req.body.clients)) {
            req.body.clients.forEach(async clientId => {
                let client: Client = {
                    user: req.session.user_id,
                    user_id: clientId
                };

                let cli: Client = await md_get_client(client);

                let options: HttpOptions = {
                    path: '/items',
                    method: 'POST',
                    access_token: cli.access_token
                };
                
                httpMethod(options, JSON.stringify(req.body.item))
                .then(responsePostItem => {
                    ret.push({user: cli.nickname, response: responsePostItem});
                })
            });

            res.json(ret);

        } else
            res.status(500).json({E: 'Associado(s) não informado.'});

    } catch(error) {
      errorRegister(error.message + ' In post_item')
      res.sendStatus(500);
    }
} 
 */
export const put_item = async (req, res) => {
    try {
        if (req.body && req.body.client) {
            
            let client: Client = {
                user: req.session.user_id,
                user_id: req.body.client
            };

            let body;

            if (req.body.item) {
                body = mountBody(req.body.item);
            } else
                res.status(500).json({E: 'item não informado.'});

            let cli: Client = await md_get_client(client);

            let options: HttpOptions = {
                path: '/items/' + req.params.id,
                method: 'PUT',
                access_token: cli.access_token
            };
            
            httpMethod(options, body)
            .then(responsePutItem => {
                res.json({user: cli.nickname, response: responsePutItem });
            });
        } else
            res.status(500).json({E: 'Associado(s) não informado(s).'});

    } catch(error) {
      errorRegister(error.message + ' In put_item')
      res.sendStatus(500);
    }
} 

export const search_items = async (req, res) => {
    try {
        let param = mountParams(req.query);
        
        const options: HttpOptions = {
            path: `/sites/${req.session.site_id}/search?q=${encodeURIComponent(req.body.q)}&${param}`,
            access_token: req.session.access_token
        }

        let ret = await httpMethod(options);

        res.json(ret);

    } catch (error) {
        errorRegister(error.message || error.E + ' In search_items');
        res.sendStatus(500);
    }
}

export const get_clients_items = async (req, res) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';
   
        const options: HttpOptions = {
            path: `/users/${req.params.client_id}/items/search${param}`,
            access_token: req.session.access_token
        }

        let ret = await httpMethod(options);

        res.json(ret);

    } catch (error) {
        errorRegister(error.message + ' In get_clients_items');
        res.sendStatus(500);
    }
}

export const get_list_areas = async (req, res) => {
    try {
        
        const options: HttpOptions = {
            path: `/sites/${req.session.site_id}/coverage_areas`,
            access_token: req.session.access_token
        }

        let ret = await httpMethod(options);

        res.json(ret);

    } catch (error) {
        errorRegister(error.message + ' In get_list_states');
        res.sendStatus(500);
    }
}

export const get_list_categories = async (req, res) => {
    try {
        
        const options: HttpOptions = {
            path: `/sites/${req.session.site_id}/categories`,
            access_token: req.session.access_token
        }

        let ret = await httpMethod(options);

        res.json(ret);

    } catch (error) {
        errorRegister(error.message + ' In get_list_categories');
        res.sendStatus(500);
    }
}

export const get_category_attributes = async (req, res) => {
    let param = req.query && req.query.q ? '?' + mountParams(req.query) : '';

    try {
        const options: HttpOptions = {
            path: `/sites/${req.session.site_id}/domain_discovery/search${param}`,
            access_token: req.session.access_token
        }

        let ret = await httpMethod(options);

        res.json(ret);

    } catch (error) {
        errorRegister(error.message + ' In get_category_attributes');
        res.sendStatus(500);
    }
}