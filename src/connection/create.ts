import { createConnection } from 'mysql';
import { promisify } from 'util';
import { errorRegister } from '../model/model_registerError';

import { configDB } from './config';

export const executeCommand = async (command: string, parameter: any[]) => {
  try {
      var connectBD = createConnection(configDB);
      connectBD.connect();
      const query = promisify(connectBD.query).bind(connectBD);
      const rows = await query(command, parameter);
      return rows;
    } catch (error) {
      errorRegister(error.message + ' In connection');
      console.error('Ops! Connection error.');
    } finally {
      connectBD.end();
    }
}