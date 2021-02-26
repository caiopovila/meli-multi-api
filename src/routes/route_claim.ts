import * as express from 'express';
import { restrict } from '../controller/control_auth';
import * as control_claim from '../controller/control_claim';
import { validate_token } from '../controller/control_validate_token';

const route = express.Router();

route.get('/search/:client_id', [restrict, validate_token], control_claim.search_claim);

export { route as claim };