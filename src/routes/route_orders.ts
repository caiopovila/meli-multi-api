import * as express from 'express';

import * as control_order from '../controller/control_order';
import { restrict } from '../controller/control_auth';
import { validate_token } from '../controller/control_validate_token';


const route = express.Router();

route.get('/:client_id', [restrict, validate_token], control_order.list_order);

route.get('/blacklist/:client', [restrict, validate_token], control_order.get_client_bl_orders);

route.post('/blacklist/:client', [restrict, validate_token], control_order.bl_orders_add);

route.delete('/blacklist/:client/:user', [restrict, validate_token], control_order.bl_orders_rm);

export { route as orders };