import { Request, Response } from "express";
import { DataClaim, DataSearchClaim, DetailClaim, EvidenceClaim, ExpectedResolutionsClaim, MessageClaim, PostMessageClaim, ResponseAttachmentsPostMessageClaim, ResponsePostMessageClaim, StatusHistoryClaim } from "../interfaces/interface_claim";
import { Client } from "../interfaces/interface_client";
import { HttpOptions } from "../interfaces/interface_httpOptons";
import { md_get_client } from "../model/model_client";
import { mountParams, httpMethod } from "../model/model_httpReq";
import { errorRegister } from "../model/model_registerError";
import { CLIENT_ID } from "../model/model_validate_token";


export const search_claim = (req: Request, res: Response) => {
    try {
        let param = req.query ? '?' + mountParams(req.query) : '';

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        }
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                path: `/v1/claims/search${param}`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((claim: DataSearchClaim) => {
                res.json(claim);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In search_claim');
        res.sendStatus(500);
    }
}

export const messages_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                path: `/v1/claims/${req.params['claim_id']}/messages`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((messages: Array<MessageClaim>) => {
                res.json(messages);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In messages_claim');
        res.sendStatus(500);
    }
}

export const post_messages_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'POST',
                path: `/v1/claims/${req.params['claim_id']}/messages?application_id=${CLIENT_ID}`,
                access_token: cli.access_token
            }

            let body: PostMessageClaim = 'messsage' in req.body && 'receiver_role' in req.body ? req.body : '';

            httpMethod(options, body)
            .then((response: ResponsePostMessageClaim) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In post_messages_claim');
        res.sendStatus(500);
    }
}

export const attachments_post_messages_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'POST',
                path: `/v1/claims/${req.params['claim_id']}/attachments`,
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + cli.access_token
                }
            }

            httpMethod(options, req.body)
            .then((response: Array<ResponseAttachmentsPostMessageClaim> | ResponseAttachmentsPostMessageClaim) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In attachments_post_messages_claim');
        res.sendStatus(500);
    }
}

export const attachments_messages_claim_download = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'GET',
                path: `/v1/claims/${req.params['claim_id']}/attachments/${req.params['attach_id']}/download`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((response: any) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In attachments_messages_claim_download');
        res.sendStatus(500);
    }
}

export const send_mediation_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'PUT',
                path: `/v1/claims/${req.params['claim_id']}`,
                access_token: cli.access_token
            }

            httpMethod(options, {stage: "dispute"})
            .then((response: DataClaim) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In send_mediation_claim');
        res.sendStatus(500);
    }
}

export const expected_resolutions_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'GET',
                path: `/v1/claims/${req.params['claim_id']}/expected_resolutions`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((response: Array<ExpectedResolutionsClaim>) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In expected_resolutions_claim');
        res.sendStatus(500);
    }
}

export const accept_expected_resolutions_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'PUT',
                path: `/v1/claims/${req.params['claim_id']}/expected_resolutions`,
                access_token: cli.access_token
            }

            httpMethod(options, {status: "accepted"})
            .then((response: Array<ExpectedResolutionsClaim>) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In expected_resolutions_claim');
        res.sendStatus(500);
    }
}

export const new_resolution_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'POST',
                path: `/v1/claims/${req.params['claim_id']}/expected_resolutions`,
                access_token: cli.access_token
            }

            httpMethod(options, {expected_resolution: req.body})
            .then((response: Array<ExpectedResolutionsClaim>) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In new_resolution_claim');
        res.sendStatus(500);
    }
}

export const post_evidences_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'POST',
                path: `/v1/claims/${req.params['claim_id']}/evidences`,
                access_token: cli.access_token
            }

            let body: EvidenceClaim = req.body;

            httpMethod(options, body)
            .then((response: Array<EvidenceClaim>) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In post_evidences_claim');
        res.sendStatus(500);
    }
}

export const get_evidences_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'GET',
                path: `/v1/claims/${req.params['claim_id']}/evidences`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((response: Array<EvidenceClaim>) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_evidences_claim');
        res.sendStatus(500);
    }
}

export const get_history_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'GET',
                path: `/v1/claims/${req.params['claim_id']}/status_history`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((response: Array<StatusHistoryClaim>) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_history_claim');
        res.sendStatus(500);
    }
}

export const get_detail_claim = (req: Request, res: Response) => {
    try {

        const dclient: Client = {
            user: req.session['user_id'], 
            user_id: Number(req.params['client_id']) ? Number(req.params['client_id']) : 0
        };
        
        md_get_client(dclient)
        .then((cli) => {

            let options: HttpOptions = {
                method: 'GET',
                path: `v1/reasons/${req.params['reason_id']}/children`,
                access_token: cli.access_token
            }

            httpMethod(options)
            .then((response: DetailClaim) => {
                res.json(response);
            })
            .catch((error: any) => res.status(500).json(error));
    
        })
        .catch(error => res.status(500).json(error));

    } catch (error) {
        errorRegister(error.message + ' In get_detail_claim');
        res.sendStatus(500);
    }
}