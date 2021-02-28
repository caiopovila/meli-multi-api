import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as path from 'path';
import * as helmet from 'helmet';
import * as cors from 'cors';

import { mlAPI } from './src/mlAPI';

require('dotenv').config();

const { 
  DOMAIN_FRONT, 
  SECRET, 
  SECURE, 
  DOMAIN_SESSION, 
  NAME_SESSION } = process.env;

export const ml = express();

ml.use(cors({
  origin: DOMAIN_FRONT,
  credentials: true
}));

ml.use(helmet());

ml.use(express.static(path.join(__dirname, './public')));

let sss: any = {
  secret: SECRET,
  name: NAME_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    domain: DOMAIN_SESSION,
    path: '/',
    maxAge: 21600000
  }
};

if (SECURE === 'true') {
  ml.set('trust proxy', 1);
  sss.cookie.secure = true;
  sss.cookie.sameSite = 'none';
}

ml.use(session(sss));

ml.use(bodyParser.urlencoded({ extended: true }));

ml.use(express.json());

ml.use('/API', mlAPI);
