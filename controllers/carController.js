const carModel = require('../models/carSchema');
const userModel = require('../models/userSchema');

module.exports.getAllCars = async (req, res) => {
  try {
    const carList = await carModel.find();
    if (!carList || carList.length === 0) {
      throw new Error("Aucune voiture trouvée");
    }
    res.status(200).json(carList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id);
    if (!car) {
      throw new Error("Voiture introuvable");
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const carById = await carModel.findById(id);
    if (!carById) {
      throw new Error("Voiture introuvable");
    }

    await userModel.updateMany({}, {
      $pull: { cars: id },
    });

    await carModel.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.AddCar = async (req, res) => {
  try {
    const {
      model,
      prix,
      description,
      kilometrage,
      fuel,
      Annee,
      boite,
      etat,
      owner,
    } = req.body;

    const files = req.files;

    if (!model || !prix || !description || !kilometrage || !fuel || !Annee || !boite || !etat || !owner) {
      return res.status(400).json({ message: "Données du formulaire manquantes." });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Aucune image reçue." });
    }

    const imageNames = files.map(file => file.filename);

    const car = await carModel.create({
      model,
      prix: Number(prix),
      description,
      kilometrage: Number(kilometrage),
      fuel,
      Annee: Number(Annee),
      boite,
      etat,
      Car_image: imageNames,
      owner: owner,
    });

    await userModel.findByIdAndUpdate(owner, {
      $push: { cars: car._id }
    });

    res.status(201).json({ message: 'Voiture ajoutée avec succès', car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.UpdateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const { model, prix, description, kilometrage, fuel, Annee } = req.body;
    const filenames = req.files?.map(f => f.filename) || [];

    const carById = await carModel.findById(id);
    if (!carById) {
      throw new Error("Voiture introuvable");
    }

    if (!model || !prix || !description || !kilometrage || !fuel || !Annee) {
      throw new Error("Erreur dans les données envoyées");
    }

    const updated = await carModel.findByIdAndUpdate(id, {
      $set: { model, prix, description, kilometrage, fuel, Annee },
    }, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affect = async (req, res) => {
  try {
    const { userId, carId } = req.body;

    const carById = await carModel.findById(carId);
    if (!carById) {
      throw new Error("Voiture introuvable");
    }

    const checkIfUserExists = await userModel.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await carModel.findByIdAndUpdate(carId, {
      $set: { owner: userId },
    });

    await userModel.findByIdAndUpdate(userId, {
      $push: { cars: carId },
    });

    res.status(200).json('affected');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.desaffect = async (req, res) => {
  try {
    const { userId, carId } = req.body;

    const carById = await carModel.findById(carId);
    if (!carById) {
      throw new Error("Voiture introuvable");
    }

    const checkIfUserExists = await userModel.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await carModel.findByIdAndUpdate(carId, {
      $unset: { owner: 1 },
    });

    await userModel.findByIdAndUpdate(userId, {
      $pull: { cars: carId },
    });

    res.status(200).json('desaffected');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarCountPerUser = async (req, res) => {
  try {
    const aggregation = await carModel.aggregate([
      {
        $group: {
          _id: "$owner",
          carCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "ownerInfo"
        }
      },
      {
        $unwind: "$ownerInfo"
      },
      {
        $project: {
          username: "$ownerInfo.username",
          carCount: 1
        }
      }
    ]);

    res.status(200).json(aggregation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getCarCountByDay = async (req, res) => {
  try {
    const aggregation = await carModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
          }
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
      {
        $project: {
          day: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(aggregation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
