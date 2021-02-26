import * as https from 'https';
import { HttpOptions } from '../interfaces/interface_httpOptons';


export const httpMethod = (opt: HttpOptions, body?: any): any => (
  new Promise ((resolve, reject) => {
      try {
          require('dns').resolve('api.mercadolibre.com', (error) => {
            if (error)
              reject({E: 'Sem conexão!'});
            else {

                let results: any = '';

                const options: HttpOptions = {
                  hostname: opt.hostname || 'api.mercadolibre.com',
                  port: opt.port || 443,
                  path: opt.path || '',
                  method: opt.method || 'GET',
                  headers: opt.headers || {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + opt.access_token
                  }
                }
                const req = https.request(options, resCode => {
                  resCode.on('data', d => {
                    if (d)
                      results += d;
                  })
                  resCode.on('end', () => {
                      resolve(JSON.parse(results ? results : 'Nada encontrado'));
                  })          
                  resCode.on('error', () => {
                    reject({E: 'Erro de conexão'});
                  })
                })
                
                if (body)
                  req.write(JSON.stringify(body))

                req.end();   
            }
          })

      } catch (error) {
          reject(error);
      }
  })
)

export const mountParams = (params) => {
  var str = "";
  for (var key in params) {
      if (str != "") {
          str += "&";
      }
      str += key + "=" + encodeURIComponent(params[key]);
  }
  return str;
}