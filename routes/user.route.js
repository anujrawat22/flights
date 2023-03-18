const express = require("express");
const { register, login, dashboard } = require("../controller/user");
const { authenticate } = require("../middlewares/authenticate");

const UserRouter = express.Router();

UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.get("/dashboard",authenticate,dashboard)

module.exports = { UserRouter };
