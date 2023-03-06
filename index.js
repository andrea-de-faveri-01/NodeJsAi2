require("dotenv").config();

const cors = require("cors");

const cloudinary = require("cloudinary").v2;

const PORT = process.env.PORT;

const aisRoutes = require("./src/api/ais/ais.routes");

const db = require("./src/utils/db.js");

db.connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const express = require("express");
const userRoutes = require("./src/api/users/user.routes");
const DevsRoutes = require("./src/api/devs/devs.routes");

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/ais", aisRoutes);
server.use("/devs", DevsRoutes);
server.use("/users", userRoutes);

server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Unexpected error");
});

server.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

server.use("/", (req, res) => {
  res.send("Working");
});

server.listen(PORT, () => {
  console.log("The server is working http://localhost:" + PORT);
});
