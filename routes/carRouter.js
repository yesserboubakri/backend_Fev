var express = require('express');
var router = express.Router();
const carController = require('../controllers/carController')
/* GET home page. */
router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);
router.post('/AddCar', carController.AddCar);
router.delete('/deleteCarById/:id', carController.deleteCarById);
router.put('/UpdateCar/:id', carController.UpdateCar);


module.exports = router;



