import * as express from 'express';

import * as control_questions from '../controller/control_questions';
import { restrict } from '../controller/control_auth';
import { validate_token } from '../controller/control_validate_token';


const route = express.Router();

route.get('/:client_id', [restrict, validate_token], control_questions.list_questions);

route.post('/answer/:client_id/:question_id', [restrict, validate_token], control_questions.post_answer);

route.delete('/:client_id/:question_id', [restrict, validate_token], control_questions.del_question);

route.get('/blacklist/:client', [restrict, validate_token], control_questions.get_client_bl_questions);

route.post('/blacklist/:client', [restrict, validate_token], control_questions.bl_questions_add);

route.delete('/blacklist/:client/:user', [restrict, validate_token], control_questions.bl_questions_rm);

export { route as questions };