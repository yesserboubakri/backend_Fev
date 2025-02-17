const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
    {
        model: String,
        matricule :String,
        color : String,
        prix : Number ,
        kilométrage : Number,
    },
    { timestamps: true }
);


const car  = mongoose.model("car",carSchema)
module.exports = car; 
