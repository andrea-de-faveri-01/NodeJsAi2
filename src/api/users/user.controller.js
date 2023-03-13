const User = require("./user.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const signUp = async (req, res, next) => {
  try {
    if (req.body.rol === "admin") {
      req.body.rol = "user";
    }
    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const modifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userToUpdate = new User(req.body);

    if (req.user.rol !== "admin") {
      req.body.rol = "user";
    }

    const idUser = JSON.stringify(req.user._id);

    const idUserParsed = idUser.slice(1, idUser.length - 1);

    if (idUserParsed === id || req.user.rol === "admin") {
      userToUpdate._id = id;

      const userUpdated = await User.findByIdAndUpdate(id, userToUpdate, {
        new: true,
      });
      return res.json(userUpdated);
    } else {
      return res.json("Request denied");
    }
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userToLog = await User.findOne({ email: req.body.email });

    if (!userToLog) {
      return res.status(500).json("User not found");
    }

    if (bcrypt.compareSync(req.body.password, userToLog.password)) {
      const token = generateSign(userToLog._id, userToLog.email);
      return res.status(200).json({ token: token, user: userToLog });
    } else {
      return res.status(500).json("Wrong password");
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async(req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.json("Error collecting the users", error)
  }
};

module.exports = { signUp, login, modifyUser, getAllUsers };
