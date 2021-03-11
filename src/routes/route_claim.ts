import * as express from 'express';
import { restrict } from '../controller/control_auth';
import * as control_claim from '../controller/control_claim';
import { validate_token } from '../controller/control_validate_token';

const route = express.Router();

route.get('/search/:client_id', [restrict, validate_token], control_claim.search_claim);

route.get('/messages/:client_id/:claim_id', [restrict, validate_token], control_claim.messages_claim);

route.post('/messages/:client_id/:claim_id', [restrict, validate_token], control_claim.post_messages_claim);

route.post('/messages/attachments/:client_id/:claim_id', [restrict, validate_token], control_claim.attachments_post_messages_claim);

route.get('/messages/attachments/download/:client_id/:claim_id/:attach_id', [restrict, validate_token], control_claim.attachments_messages_claim_download);

route.put('/mediation/:client_id/:claim_id', [restrict, validate_token], control_claim.send_mediation_claim);

route.get('/resolutions/:client_id/:claim_id', [restrict, validate_token], control_claim.expected_resolutions_claim);

route.post('/resolutions/:client_id/:claim_id', [restrict, validate_token], control_claim.new_resolution_claim);

route.put('/resolutions/accept/:client_id/:claim_id', [restrict, validate_token], control_claim.accept_expected_resolutions_claim);

route.get('/evidences/:client_id/:claim_id', [restrict, validate_token], control_claim.get_evidences_claim);

route.post('/evidences/:client_id/:claim_id', [restrict, validate_token], control_claim.post_evidences_claim);

route.get('/history/:client_id/:claim_id', [restrict, validate_token], control_claim.get_history_claim);

route.get('/detail/:client_id/:reason_id', [restrict, validate_token], control_claim.get_detail_claim);

export { route as claim };