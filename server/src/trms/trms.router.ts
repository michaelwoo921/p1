import Express from 'express';
import logger from '../log';
import trmsService from '../trms/trms.service';

const router = Express.Router();

/* GET users listing. */
router.get('/',  function(req: any, res, next) {
    trmsService.getTrmss().then((trmss) => {
    res.send(JSON.stringify(trmss));
    });
});

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    trmsService.addTrms(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.put('/', function(req: any, res, next) {
    trmsService.updateTrms(req.body).then((data)=>{
    res.send(JSON.stringify(data));
    });

});


router.get('/:nam/:dt', function(req: any, res, next) {
    trmsService.getTrms(req.params.nam, req.params.dt).then((data: any)=>{
    res.send(JSON.stringify(data));
    });

});



router.delete('/:nam/:dt', function (req, res, next) {
    logger.debug(req.body);
    trmsService.deleteTrms(req.params.nam, req.params.dt).then((data)=> {
        logger.debug(data);
        res.sendStatus(200); // item deleted
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error
    })
});

export default router;