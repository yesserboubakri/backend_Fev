var express = require('express');
var router = express.Router();
const carController = require('../controllers/carController')
const upload = require('../middlewares/uploadFile');

/* GET home page. */
router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);


router.delete('/deleteCarById/:id', carController.deleteCarById);
router.put('/UpdateCar/:id', carController.UpdateCar);
router.put('/affect', carController.affect);
router.put('/desaffect', carController.desaffect);
router.post('/AddCar', upload.array("Car_image", 10), carController.AddCar);
 

module.exports = router;



