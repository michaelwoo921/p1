import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';

const router = express.Router();


router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  logger.debug(u);
  if(u.name && u.password ){
    user.login(u.name, u.password).then(user =>{
      if(!user){
        res.sendStatus(401);
      }
      req.session.user =user;
      res.send(JSON.stringify(user));
    });
  }
  else {
    res.sendStatus(401);
  }
 
 
});

router.post('/', function(req: any, res, next) {
  logger.debug(req.body, 'req.body');
  user.login(req.body.name, req.body.password).then((user) => {
    if(user === null) {
      res.sendStatus(401);
    }
    req.session.user = user;
    res.send(JSON.stringify(user))
  });
});

// Much more restful
router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
})



router.put('/', async function(req: any,res,next){
    let u= {...req.session.user};
    let current_year = new Date().getFullYear();
  logger.debug(u, 'before change')

    //reset fund for the new year
    if(Number(current_year)  > u.year ){
      u.fund=1000;
      u.year = current_year;
    }

    logger.debug(u, 'after change');
    if(typeof(u.name)=== 'string' && typeof(u.password) === 'string' && u.name !=='' 
    && u.password !== '' && req.body && req.body.fund){
        u.fund= Number(req.body.fund);
        await user.updateUser(u);
        setTimeout(()=> { res.redirect('/users');}, 1000);
    }
    else{
      res.sendStatus(401);
    }


});

router.get('/login', function(req,res,next){
  res.sendFile('index.html', {root: publicDir})
})

export default router;
