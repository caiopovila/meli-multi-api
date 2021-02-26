import * as express from 'express';

import * as control_item from '../controller/control_item';
import { restrict } from '../controller/control_auth';
import { validate_token } from '../controller/control_validate_token';

import * as fileUpload from 'express-fileupload';

const route = express.Router();

route.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/img/'
}));

route.get('/:id', [restrict, validate_token], control_item.get_item);

route.get('/info/category/discovery', [restrict, validate_token], control_item.get_category_attributes);

route.get('/info/currencies', [restrict, validate_token], control_item.get_currencies);

route.get('/info/listing_type', [restrict, validate_token], control_item.get_listing_types);

route.get('/info/areas', [restrict, validate_token], control_item.get_list_areas);

route.get('/info/categories', [restrict, validate_token], control_item.get_list_categories);

route.post('/search', [restrict, validate_token], control_item.search_items);

route.post('/search/:client_id', [restrict, validate_token], control_item.get_clients_items);

route.post('/', [restrict, validate_token], control_item.post_clone_item);

route.post('/img', [restrict, validate_token], control_item.post_img);

/* route.post('/', [restrict, validate_token], control_item.post_item); */

route.put('/:id', [restrict, validate_token], control_item.put_item);

export { route as items };