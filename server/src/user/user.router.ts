import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';

const router = express.Router();


router.get('/', (req: any, res, next) => {

  if(!req.session.user){
    res.sendStatus(401);
  }
  let u = {...req.session.user};
  logger.debug(u);
  user.login(u.name, u.password).then(user =>{
    if(!user){
      res.sendStatus(401);
    }
    req.session.user =user;
    res.send(JSON.stringify(user));
  });
 
});

router.post('/', function(req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((user) => {
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
  if(!req.session.user){
    res.sendStatus(401);
  }
    let u= {...req.session.user};
    u.fund = u.fund + 1000;  // update item
    logger.debug(u);
    if(u.name && u.password){
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
