const { isAuth } = require("../../middlewares/auth");
const { signUp, login, modifyUser } = require("./user.controller");
const userRoutes = require("express").Router();

userRoutes.post("/", signUp);
userRoutes.post("/login", login);
userRoutes.put("/:id", [isAuth], modifyUser);

module.exports = userRoutes;
