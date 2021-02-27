import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as path from 'path';
import * as helmet from 'helmet';
import * as cors from 'cors';

import { mlAPI } from './src/mlAPI';

require('dotenv').config();


const { DOMAIN_FRONT, SECRET, SECURE, DOMAIN_SESSION, NAME_SESSION } = process.env;

export const ml = express();

ml.use(helmet());

ml.use(cors({
  origin: DOMAIN_FRONT,
  credentials: true
}));

ml.use(express.static(path.join(__dirname, './public')));

ml.set('trust proxy', 1);

ml.use(session({
    secret: SECRET,
    name: NAME_SESSION,
    resave: false,
    saveUninitialized: false,
    /*cookie: {
      secure: Boolean(SECURE),
      httpOnly: true,
      domain: DOMAIN_SESSION,
      path: '/',
      sameSite: 'none',
      maxAge: 21600000
    }*/
}));

ml.use(bodyParser.urlencoded({ extended: false }));

ml.use(express.json());

ml.use('/API', mlAPI);
