import * as express from 'express';

import * as control_message from '../controller/control_message';
import { restrict } from '../controller/control_auth';
import { validate_token } from '../controller/control_validate_token';


const route = express.Router();

route.get('/:pack/:id/:buyer', [restrict, validate_token], control_message.get_message);

route.get('/attachments/:file/:id', [restrict, validate_token], control_message.get_attachments);

route.post('/', [restrict, validate_token], control_message.post_message);

export { route as msg };