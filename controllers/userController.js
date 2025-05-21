const userModel = require('../models/userSchema');
const carModel = require('../models/carSchema');
const jwt = require('jsonwebtoken');

const maxTime = 24 * 60 * 60; // 24H

const createToken = (id) => {
  return jwt.sign({ id }, 'net secret pfe', { expiresIn: maxTime });
};

module.exports.addUserClient = async (req, res) => {
  try {
    const { username, email, password, age, role } = req.body;
    const user = await userModel.create({
      username,
      email,
      password,
      age,
      role: role || 'client'
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.addUserClientWithImg = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const { filename } = req.file;

    const user = await userModel.create({
      username,
      email,
      password,
      user_image: filename,
      role: role || 'client'
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.addUserAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const roleAdmin = 'admin';
    const user = await userModel.create({
      username,
      email,
      password,
      role: roleAdmin
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt_token_9antra", token, {
      httpOnly: false,
      maxAge: maxTime * 1000
    });

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.logout = async (req, res) => {
  try {
    res.cookie("jwt_token_9antra", "", { httpOnly: false, maxAge: 1 });
    res.status(200).json("logged");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllUsers = async (req, res) => {
  try {
    const userListe = await userModel.find();
    res.status(200).json({ userListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) throw new Error("User not found");

    await carModel.updateMany({ owner: id }, {
      $unset: { owner: 1 }
    });

    await userModel.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.updateuserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;

    await userModel.findByIdAndUpdate(id, { $set: { email, username } });
    const updated = await userModel.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.searchUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) throw new Error("Veuillez fournir un nom pour la recherche.");

    const userListe = await userModel.find({
      username: { $regex: username, $options: "i" }
    });

    if (!userListe.length) throw new Error("User not found");

    const count = userListe.length;
    res.status(200).json({ userListe, count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllUsersSortByAge = async (req, res) => {
  try {
    const userListe = await userModel.find().sort({ age: 1 }).limit(2);
    res.status(200).json({ userListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsersAge = async (req, res) => {
  try {
    const { age } = req.params;
    const userListe = await userModel.find({ age: age });
    res.status(200).json({ userListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllUsersAgeBetMaxAgeMinAge = async (req, res) => {
  try {
    const MaxAge = req.query.MaxAge;
    const MinAge = req.query.MinAge;
    const userListe = await userModel.find({ age: { $gt: MinAge, $lt: MaxAge } }).sort({ age: 1 });

    res.status(200).json({ userListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllClient = async (req, res) => {
  try {
    const userListe = await userModel.find({ role: "client" });
    res.status(200).json({ userListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllAdmin = async (req, res) => {
  try {
    const userListe = await userModel.find({ role: "admin" });
    res.status(200).json({ userListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
