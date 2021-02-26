import * as express from 'express';

import * as control_notif from '../controller/control_notification';
import { restrict } from '../controller/control_auth';
import { validate_token } from '../controller/control_validate_token';


const route = express.Router();

route.get('/', [restrict, validate_token], control_notif.get_list_notif);

route.get('/detail/:topic/:reso/:id', [restrict, validate_token], control_notif.get_det_notif);

export { route as notif };