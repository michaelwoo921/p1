import express from 'express';
import publicDir from '../constant';


const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res, next) {
  res.sendFile('index.html', { root: publicDir });
});



export default router;
