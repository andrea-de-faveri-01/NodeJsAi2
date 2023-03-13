const { isAuth } = require("../../middlewares/auth");
const { signUp, login, modifyUser, getAllUsers } = require("./user.controller");
const userRoutes = require("express").Router();

userRoutes.post("/", signUp);
userRoutes.post("/login", login);
userRoutes.put("/:id", [isAuth], modifyUser);
userRoutes.get("/", getAllUsers)

module.exports = userRoutes;
