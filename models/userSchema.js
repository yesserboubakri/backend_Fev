const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    username: string,
    email: { type: string, required: true, unique: true },
    password: {
        type: string, 
        required: true,
         minLength: 8,
          match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.'

        ]
    },
    role: {
        type: string,
        enum: ["admin", "client", "infi"]
    },
    user_image: { type: string, require: false, default: "client.png" },
    //etat : Boolean
    count : Number,
}, 
{ timestamps: true }
);
 
userSchema.pre("save", async function(next){
    try {
        const salt = await bcrypt.genSalt();
        const user = this ;
        user.password = await bcrypt.hash(user.password,salt);
        //etat = false ;
        user.count = user.count + 1
        next();
    } catch (error) {
        next(error);
    }
    }
);



userSchema.post("save", async function (req,res,next) {
    console.log("new user was created and saved successfully");
    next();
})
const user = mongosse.model("user",userSchema);
module.exports = user; 
