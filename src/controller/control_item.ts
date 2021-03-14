import { Request, Response } from 'express';
import { CoverageArea } from '../interfaces/interface_area';
import { Category, DomainDiscovery } from '../interfaces/interface_categories';
import { Client } from '../interfaces/interface_client';
import { Currencies } from '../interfaces/interface_currencies';
import { HttpOptions } from '../interfaces/interface_httpOptons';
import { DataSearchItem, Description, Item, ItemsClient } from '../interfaces/interface_item';
import { ListingType } from '../interfaces/interface_listingType';
import { md_get_client } from '../model/model_client';

import { httpMethod, mountParams } from "../model/model_httpReq";
import { mountBody } from '../model/model_item';
import { errorRegister } from '../model/model_registerError';


export const get_item = (req: Request, res: Response) => {
    try {

        const options: HttpOptions = {
            path: `/items/${req.params.id}`,
            access_token: req.session['access_token']
        }

        httpMethod(options)
        .then((item: Item) => {

            const optionsDesc: HttpOptions = {
                path: `/items/${req.params.id}/descriptions`,
                access_token: req.session['access_token']
            }
    
            httpMethod(optionsDesc)
            .then((desc: Description) => {
                res.json({
                    description: desc,
                    data: item
                }); 
            })
            .catch((error: any) => res.json({
                                        description: error,
                                        data: item 
                                    })
            );
    
        })
        .catch((error: any) => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_item');
        res.sendStatus(500);
    }
}

export const get_listing_types = (req: Request, res: Response) => {
  try {

        const optionslisting_types: HttpOptions = {
            path: `/sites/${req.session['site_id']}/listing_types`,
            access_token: req.session['access_token']
        }

        httpMethod(optionslisting_types)
        .then((listing_types: Array<ListingType>) => {
            res.json(listing_types);
        })
        .catch((error: any) => res.status(500).json(error));

  } catch (error) {
    errorRegister(error.message + ' In get_listing_types');
    res.sendStatus(500);
  }  
}

export const get_currencies = (req: Request, res: Response) => {
  try {

    const optionsCurrencies: HttpOptions = {
        path: `/currencies`,
        access_token: req.session['access_token']
    }

    httpMethod(optionsCurrencies)
    .then((currencies: Array<Currencies>) => {
        res.json(currencies);
    })
    .catch((error: any) => res.status(500).json(error));

  } catch (error) {
    errorRegister(error.message + ' In get_currencies');
    res.sendStatus(500);
  }  
}

export const post_clone_item = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: req.body && req.body.client ? req.body.client : 0
        }
    
        md_get_client(dclient)
        .then((clientdb) => {

            let body: any = {};
            body = mountBody(req.body && req.body.item ? req.body.item : '');

            const optionsPostItem: HttpOptions = {
                path: `/items`,
                method: 'POST',
                access_token: clientdb.access_token
            }

            httpMethod(optionsPostItem, body)
            .then((responsePostItem: Item) => {
                res.json(responsePostItem);
            })
            .catch((error: any) => res.status(500).json({user: clientdb.nickname, response: error}));

        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In post_clone_item');
        res.sendStatus(500);
    }
}

export const post_description_item = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: 'client' in req.body ? req.body['client'] : 0
        }
    
        md_get_client(dclient)
        .then((clientdb) => {

            let body = {} as Description;
            body = 'plain_text' in req.body ? req.body['plain_text'] : {};

            const optionsPostDescription: HttpOptions = {
                path: `/items/${req.params['item_id']}/description`,
                method: 'POST',
                access_token: clientdb.access_token
            }

            httpMethod(optionsPostDescription, body)
            .then((responsePostDescription: Item) => {
                res.json(responsePostDescription);
            })
            .catch((error: any) => res.status(500).json({user: clientdb.nickname, response: error}));

        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In post_description_item');
        res.sendStatus(500);
    }
}

export const put_description_item = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: 'client' in req.body ? req.body['client'] : 0
        }
    
        md_get_client(dclient)
        .then((clientdb) => {

            let body = {} as Description;
            body = 'plain_text' in req.body ? req.body['plain_text'] : {};

            const optionsPutDescription: HttpOptions = {
                path: `/items/${req.params['item_id']}/description?api_version=2`,
                method: 'PUT',
                access_token: clientdb.access_token
            }

            httpMethod(optionsPutDescription, body)
            .then((responsePutDescription: Item) => {
                res.json(responsePutDescription);
            })
            .catch((error: any) => res.status(500).json({user: clientdb.nickname, response: error}));

        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In put_description_item');
        res.sendStatus(500);
    }
}

export const delete_item = (req: Request, res: Response) => {
    try {
        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: 'client_id' in req.params ? req.body['client_id'] : 0
        }
    
        md_get_client(dclient)
        .then((clientdb) => {

            let body = {
                deleted: true
            };

            const optionsDeleteItem: HttpOptions = {
                path: `/items/${req.params['item_id']}`,
                method: 'PUT',
                access_token: clientdb.access_token
            }

            httpMethod(optionsDeleteItem, body)
            .then((responseDeleteItem: Item) => {
                res.json(responseDeleteItem);
            })
            .catch((error: any) => res.status(500).json({user: clientdb.nickname, response: error}));

        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In delete_item');
        res.sendStatus(500);
    }
}

export const post_img = (req: Request, res: Response) => {
    let pictures: any = [];

    try {
        console.log(req.body, req.files);

        if (req.files) {
            if (Array.isArray(req.files))
                req.files.forEach(item => {
                    pictures.push({source: `${req.protocol}://${req.get('host')}/img/${item.filename}`})
                });
            else
                pictures.push({source: `${req.protocol}://${req.get('host')}/img/${req.files.filename}`})
        }

    } catch (error) {
        errorRegister(error.message ? error.message : error.E + ' In post_img');
        res.sendStatus(500);
    } finally {
        res.json(pictures);
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
export const put_item = (req: Request, res: Response) => {
    try {
        let client: Client = {
            user: req.session['user_id'],
            user_id: req.body && req.body.client ? req.body.client : 0
        };

        let body: any = {};
        body = mountBody(req.body && req.body.item ? req.body.item : '');

        md_get_client(client)
        .then((cli) => {

            let options: HttpOptions = {
                path: '/items/' + req.params.id,
                method: 'PUT',
                access_token: cli.access_token
            };
            
            httpMethod(options, body)
            .then((responsePutItem: any) => {
                res.json({user: cli.nickname, response: responsePutItem });
            })
            .catch((error: any) => res.status(500).json(error));

        })
        .catch(error => res.status(500).json(error));

    } catch(error) {
      errorRegister(error.message + ' In put_item')
      res.sendStatus(500);
    }
} 

export const search_items = (req: Request, res: Response) => {
    try {
        let param = mountParams(req.query);
        
        const options: HttpOptions = {
            path: `/sites/${req.session['site_id']}/search?q=${encodeURIComponent(req.body && req.body.q ? req.body.q : '')}&${param}`,
            access_token: req.session['access_token']
        }

        httpMethod(options)
        .then((ret: DataSearchItem) => {
            res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message || error.E + ' In search_items');
        res.sendStatus(500);
    }
}

export const get_clients_items = (req: Request, res: Response) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';
   
        const options: HttpOptions = {
            path: `/users/${req.params.client_id}/items/search${param}`,
            access_token: req.session['access_token']
        }

        httpMethod(options)
        .then((ret: ItemsClient) => {
            res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_clients_items');
        res.sendStatus(500);
    }
}

export const get_list_areas = (req: Request, res: Response) => {
    try {
        
        const options: HttpOptions = {
            path: `/sites/${req.session['site_id']}/coverage_areas`,
            access_token: req.session['access_token']
        }

        httpMethod(options)
        .then((ret: Array<CoverageArea>) => {
            res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_list_states');
        res.sendStatus(500);
    }
}

export const get_list_categories = (req: Request, res: Response) => {
    try {
        
        const options: HttpOptions = {
            path: `/sites/${req.session['site_id']}/categories`,
            access_token: req.session['access_token']
        }

        httpMethod(options)
        .then((ret: Array<Category>) => {
            res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_list_categories');
        res.sendStatus(500);
    }
}

export const get_category_attributes = (req: Request, res: Response) => {
    let param = req.query && req.query.q ? '?' + mountParams(req.query) : '';

    try {
        const options: HttpOptions = {
            path: `/sites/${req.session['site_id']}/domain_discovery/search${param}`,
            access_token: req.session['access_token']
        }

        httpMethod(options)
        .then((ret: Array<DomainDiscovery>) => {
            res.json(ret);
        })
        .catch((error: any) => res.status(500).json(error));;

    } catch (error) {
        errorRegister(error.message + ' In get_category_attributes');
        res.sendStatus(500);
    }
}