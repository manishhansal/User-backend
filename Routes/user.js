const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
const userController = require("../Controllers/user");

app.post("/signIn", userController.signIn);
app.post("/signUp", userController.signUp);
app.post("/user", userController.createUser);
app.get("/user", userController.getAllUsers);
app.put("/user/:userId", userController.updateUser);
app.delete("/user/:userId", userController.deleteUser);

module.exports = app;
