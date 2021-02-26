import { User } from "../interfaces/interface_user";
import { auth, convertBase64, hashGenerator } from "../model/model_auth";
import { errorRegister } from "../model/model_registerError";


export const login = async (req, res) => {
   try {
      if(req.get('Authorization')) {
         
         const authSent = req.get('Authorization');

         const duser: User = convertBase64(authSent.split(' ')[1]);

         auth(duser)
         .then((ret: User) => {
            req.session.regenerate(() => {
               req.session.privilege = ret.privilege;
               req.session.user_id = ret.id_user;
               req.session.hash = hashGenerator(ret); 
               res.json({id: req.session.hash});
            });
         })
         .catch(error => res.status(401).json(error));
      } else 
         res.status(401).json({ E: 'Valores não informados.' });

   } catch (error) {
       errorRegister(error.message + ' In login');
       res.sendStatus(500);
   }
}

export const exit = (req, res) => {
   req.session.destroy();    
   res.json({S: 'Ok'});
}

export const restrict_adm = (req, res, next) => {
   if (req.session.privilege == 'alto' && req.query.id == req.session.hash) {
     next();
   } else {
      res.sendStatus(403);
   }
}

export const restrict = (req, res, next) => {
   
   if(req.get('Authorization')) {

      const hash = req.get('Authorization').split(' ')[1];

      if (req.session.privilege == 'normal' && hash == req.session.hash) {
         next();
      } else {
         res.sendStatus(403);
      }
   } else
      res.sendStatus(403);
}