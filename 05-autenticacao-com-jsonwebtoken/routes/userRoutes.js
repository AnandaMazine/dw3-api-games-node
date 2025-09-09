import express from "express";
const userRotes = express.Router();
import userController from "../controllers/userController.js";

//Rota para CADASTRAR um usuário
userRotes.post("/user", userController.createUser);

// ENDPOINT para LOGAR um usuário
userRotes.post("/login", userController.loginUser);

export default userRotes;