const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { postDev, getAllDevs, getDevById } = require("./devs.controller");

const DevsRoutes = require("express").Router();

DevsRoutes.post("/", upload.single("logo"), postDev);
DevsRoutes.get("/", getAllDevs);
DevsRoutes.get("/:id", getDevById);

module.exports = DevsRoutes;
