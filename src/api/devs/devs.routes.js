const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { postDev, getDevs } = require("./devs.controller");

const DevsRoutes = require("express").Router();

DevsRoutes.post("/", upload.single("logo"), postDev);
DevsRoutes.get("/", getDevs);

module.exports = DevsRoutes;
