const mongoose = require ('mongoose');

module.exports.connectToMongodb = async () =>{
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.MongoDb_Url)
    .then(
        ( ) => {console.log("connect to db")}
    )
    .catch((err) => {
        console.log(err); 
    }); 

};