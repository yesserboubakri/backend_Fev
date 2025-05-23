const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client"
    },
    user_image: { type: String, require: false, default: "client.png" },
    age: { type: Number },
    count: { type: Number, default: "0" },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    etat: Boolean,
    ban: Boolean,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const user = this;

    user.password = await bcrypt.hash(user.password, salt);

    if (user.isNew) {
      user.etat = false;
      user.ban = true;
      user.count = 1;
    }

    next();
  } catch (error) {
    next(error);
  }
});


userSchema.post("save", async function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});

userSchema.statics.login = async function (email, password) {
  //console.log(email, password);
  const user = await this.findOne({ email });
  //console.log(user)
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    //console.log(auth)
    if (auth) {
      // if (user.etat === true) {
      //   if (user.ban === false) {
      return user;
      //   } else {
      //     throw new Error("ban");
      //   }
      // } else {
      //   throw new Error("compte desactive ");
      // }
    } else {
      throw new Error("password invalid");
    }
  } else {
    throw new Error("email not found");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;