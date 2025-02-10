const userMdel = require('../models/userSchema');

module.exports.addUserClient = async(req,res) =>{
     try {
         const {username , email , password } = 
         res.status(200).json({});      
    } catch (error) {
         res.status(500).json({message: error.message});
     }
    }