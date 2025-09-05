import express from "express";
const userRotes = express.Router();
import userController from "../controllers/userController.js";

//Rota para CADASTRAR um usuário
userRotes.post("/user", userController.createUser);

export default userRotes;