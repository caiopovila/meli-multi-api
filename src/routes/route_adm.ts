import * as express from 'express';

import * as control_adm from '../controller/control_adm';
import { restrict, restrict_adm } from '../controller/control_auth';


const route = express.Router();

route.get('/users', restrict_adm, control_adm.list_users);

route.get('/user', restrict, control_adm.get_user);

route.get('/site', restrict, control_adm.list_site);

route.post('/site', restrict, control_adm.post_site_id);

route.post('/', control_adm.new_user);

route.put('/', restrict, control_adm.up_user);

route.delete('/:id', restrict_adm, control_adm.del_user);

export { route as adm };