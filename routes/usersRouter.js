var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
 // GET users listing. 
router.post('/addUserClient', userController.addUserClient);
router.post('/addUserAdmin', userController.addUserAdmin);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/searchUserByUsername', userController.searchUserByUsername);
router.get('/getAllUsersSortByAge', userController.getAllUsersSortByAge);
router.get('/getAllAdmin', userController.getAllAdmin);
router.get('/getAllClient', userController.getAllClient);
router.get('/getAllUsersSortAge/:age', userController.getAllUsersAge);
router.get('/getAllUsersAgeBetMaxAgeMinage', userController.getAllUsersAgeBetMaxAgeMinage);
router.put('/updateUserById/:id', userController.updateUserById);
router.delete('/deleteUserById/:id', userController.deleteUserById);

router.post('/addUserClientWithImg',upload.single("user_image"), userController.addUserClientWithImg);

module.exports = router;
