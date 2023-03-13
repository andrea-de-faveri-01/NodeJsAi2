const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllAis, getAiById, getAiByName, getAiByCategory, getAiBeforeYear, postAi, deleteAi, deleteAiByName, updateAi, } = require("./ais.controller");

const aisRoutes = require("express").Router();

aisRoutes.get("/", getAllAis);
aisRoutes.get("/:id", [isAuth], getAiById);
aisRoutes.get("/name/:name", [isAuth], getAiByName);
aisRoutes.get("/category/:category", [isAuth], getAiByCategory);
aisRoutes.get("/beforeYear/:year", [isAuth], getAiBeforeYear);
aisRoutes.post("/", [isAdmin], upload.single("logo"), postAi);
aisRoutes.delete("/:idAi", [isAdmin], deleteAi);
aisRoutes.delete("/deleteByName/:name", [isAdmin], deleteAiByName);
aisRoutes.put("/:id", [isAdmin], upload.single("logo"), updateAi);

module.exports = aisRoutes;