const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
    {
        model: String,
        matricule :String,
        color : String,
        prix : Number ,
        kilométrage : Number,
        owner:{type :mongoose.Schema.Types.ObjectId,ref:'User'} // many to one
    },
    { timestamps: true }
);


const Car  = mongoose.model("Car",carSchema)
module.exports = Car; 
