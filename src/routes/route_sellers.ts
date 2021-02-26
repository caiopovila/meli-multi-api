import * as express from 'express';

import { restrict } from '../controller/control_auth';
import { validate_token } from '../controller/control_validate_token';
import * as control_sellers from '../controller/control_seller';


const route = express.Router();

route.get('/:seller_id', [restrict, validate_token], control_sellers.info_seller);

export { route as sellers }