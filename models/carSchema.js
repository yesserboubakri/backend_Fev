const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    prix: { type: Number, required: true },
    kilometrage: { type: Number, required: true },
    description: { type: String, required: true },
    Annee: { type: Number, required: true },
    fuel: { type: String, required: true },
    boite: { type: String, required: true },
    etat: { type: String, required: true },
    Car_image: { type: [String], required: true },

    // Relations
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
