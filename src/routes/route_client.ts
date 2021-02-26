import * as express from 'express';

import { restrict } from '../controller/control_auth';
import * as control_client from '../controller/control_client';
import { validate_token } from '../controller/control_validate_token';


const route = express.Router();

route.get('/', [restrict, validate_token], control_client.list_client);

route.get('/link', control_client.get_link);

route.get('/notices/:client_id', [restrict, validate_token], control_client.get_notices);

route.get('/visits/:client_id', [restrict, validate_token], control_client.get_total_visits);

route.get('/:client_id', [restrict, validate_token], control_client.get_info_client);

route.get('/balance/:client_id', [restrict, validate_token], control_client.get_balance_client);

route.get('/questions/:client_id', [restrict, validate_token], control_client.get_total_questions_client);

route.put('/:client', [restrict, validate_token], control_client.up_client);

route.post('/nick/:user_id',  [restrict, validate_token], control_client.set_nick);

export { route as client };