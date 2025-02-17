
const user = require('../models/userSchema');
const userMdel = require('../models/userSchema');

module.exports.addUserClient = async (req, res) => {
    try {
        const { username, email, password,age } = req.body;
        const roleClient = 'client'
        const user = await userMdel.create({
            username, email, password, role: roleClient, age
        })
        res.status(200).json({  user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.addUserClientWithImg = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const roleClient = 'client'
        const { filename } = req.file
        const user = await userMdel.create({
            username, email, password, role: roleClient, user_image: filename
        })
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.addUserAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const roleAdmin = 'admin'
        const user = await userMdel.create({
            username, email, password, role: roleAdmin
        })
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.getAllUsers = async (req, res) => {
    try {
        const userListe = await userMdel.find()
        res.status(200).json({ userListe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        ///console.log(req.params.id)
        const user = await userMdel.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const chekIfUserExists = await userMdel.findById(id);
        if (!chekIfUserExists) {
            throw new Error("User not found")
        }
        await userMdel.findByIdAndDelete(id);
        res.status(200).json("delete");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, username } = req.body;
        await userMdel.findByIdAndUpdate(id, { $set: { email, username } })
        const update = await userMdel
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.searchUserByUsername = async (req, res) => {
    try {
         const {username} = req.query
         if(!username){
            throw new Error("veuillez fournir un nom pour la recherche ")
         }

         const userListe = await userMdel.find({
            username: {$regex : username , $options: "i"}
         })
         if(!userListe){
            throw new Error("user not found")
         }
         const count = userListe.length;
        res.status(200).json({userListe,count});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.getAllUsersSortByAge = async (req, res) => {
    try {
        const userListe = await userMdel.find().sort({age : 1}).limit(2);

        res.status(200).json({ userListe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }}

 module.exports.getAllUsersAge = async (req, res) => {
        try {
            const {age} = req.params
            const userListe = await userMdel.find({age : age})
    
            res.status(200).json({ userListe });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }}

module.exports.getAllUsersAgeBetMaxAgeMinage = async (req, res) => {
 try {
      const MaxAge = req.query.MaxAge
      const MinAge = req.query.MinAge
      const userListe = await userMdel.find({age : {$gt : MinAge , $lt : MaxAge  }}).sort({age : 1})
        
                res.status(200).json({ userListe });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }}
module.exports.getAllClient = async (req, res) => {
 try {
    const userListe = await userMdel.find({role:"client"})
     res.status(200).json({ userListe });
 } catch (error) {
    res.status(500).json({ message: error.message });
 }}
module.exports.getAllAdmin = async (req, res) => {
try {
    const userListe = await userMdel.find({role:"admin"})
    res.status(200).json({ userListe });
    } catch (error) {
       res.status(500).json({ message: error.message });
}}