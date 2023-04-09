const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllAis, getAiById, getAiByName, getAiByCategory, getAiBeforeYear, postAi, deleteAi, deleteAiByName, updateAi, } = require("./ais.controller");

const aisRoutes = require("express").Router();

aisRoutes.get("/", getAllAis);
aisRoutes.get("/:id", getAiById);
aisRoutes.get("/name/:name", getAiByName);
aisRoutes.get("/category/:category", getAiByCategory);
aisRoutes.get("/beforeYear/:year", getAiBeforeYear);
aisRoutes.post("/", upload.single("logo"), postAi);
aisRoutes.delete("/:idAi", deleteAi);
aisRoutes.delete("/deleteByName/:name", deleteAiByName);
aisRoutes.put("/:id", upload.single("logo"), updateAi);

module.exports = aisRoutes;