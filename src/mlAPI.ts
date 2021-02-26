import * as express from 'express';

import { auth } from './routes/route_auth';
import { questions } from './routes/route_questions';
import { orders } from './routes/route_orders';
import { sellers } from './routes/route_sellers';
import { client } from './routes/route_client';
import { notif } from './routes/route_notification';
import { items } from './routes/route_items';
import { msg } from './routes/route_message';
import { adm } from './routes/route_adm';
import { index } from './routes/route_index';
import { claim } from './routes/route_claim';


export const mlAPI = express();

mlAPI.use('/questions', questions);
mlAPI.use('/orders', orders);
mlAPI.use('/messages', msg);
mlAPI.use('/sellers', sellers);
mlAPI.use('/client', client);
mlAPI.use('/items', items);
mlAPI.use('/notification', notif);
mlAPI.use('/adm', adm);
mlAPI.use('/auth', auth);
mlAPI.use('/claim', claim);
mlAPI.use('/', index);