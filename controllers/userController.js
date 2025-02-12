const user = require('../models/userSchema');
const userMdel = require('../models/userSchema');

module.exports.addUserClient = async(req,res) =>{
     try {
         const {username , email , password } = req.body;
         const roleClient = 'client'
         const user= await userMdel.create({
             username,email,password,role :roleClient
         })
         res.status(200).json({user});      
    } catch (error) {
         res.status(500).json({message: error.message});
     }
    }  

    module.exports.addUserClientWithImg = async(req,res) =>{
        try {
            const {username , email , password } = req.body;
            const roleClient = 'client'
            const {filename} = req.file
            const user= await userMdel.create({
                username,email,password,role :roleClient, user_image : filename
            })
            res.status(200).json({user});      
       } catch (error) {
            res.status(500).json({message: error.message});
        }
       } 

    module.exports.addUserAdmin = async(req,res) =>{
        try {
            const {username , email , password } = req.body;
            const roleAdmin = 'admin'
            const user= await userMdel.create({
                username,email,password,role :roleAdmin
            })
            res.status(200).json({user});      
       } catch (error) {
            res.status(500).json({message: error.message});
        }
       }  
       module.exports.getAllUsers= async(req,res) =>{
        try {
            const userListe = await userMdel.find()
            res.status(200).json({userListe});      
       } catch (error) {
            res.status(500).json({message: error.message});
        }
       }  
       module.exports.getUserById= async(req,res) =>{
        try {
            const {id} = req.params
            ///console.log(req.params.id)
            const user = await userMdel.findById(id);
            res.status(200).json({user});      
       } catch (error) {
            res.status(500).json({message: error.message});
        }
       }  

       module.exports.deleteUserById= async(req,res) =>{
        try {
            const {id} = req.params
            const chekIfUserExists =await userMdel.findById(id);
            if(!chekIfUserExists){
                throw new Error("User not found")
            }
            await userMdel.findByIdAndDelete(id);
            res.status(200).json("delete");      
       } catch (error) {
            res.status(500).json({message: error.message});
        }
       }  