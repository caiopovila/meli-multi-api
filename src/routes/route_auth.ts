import * as express from 'express';

import * as control_auth from '../controller/control_auth';
import { code_valid } from '../controller/control_validate_token';


const route = express.Router();

route.post('/', control_auth.login);

route.get('/code', code_valid);

route.post('/exit', [control_auth.restrict], control_auth.exit);

export { route as auth };