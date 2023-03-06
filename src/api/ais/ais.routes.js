const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllAis, getAiById, getAiByCategory, getAiBeforeYear, } = require("./ais.controller");

const aisRoutes = require("express").Router();

aisRoutes.get("/", getAllAis);
aisRoutes.get("/:id", getAiById);
aisRoutes.get("/category/:category", getAiByCategory);
aisRoutes.get("/getAiBeforeYear/:year", getAiBeforeYear);

module.exports = aisRoutes;