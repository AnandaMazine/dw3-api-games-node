import express from "express";
const gameRoutes = express.Router();
import gameController from "../controllers/gameController.js";

// A camada de routes será responsável por contar os ENDPOINTS(rotas, URL) da API

// ENDPOINT para LISTAR
gameRoutes.get("/games", gameController.getAllgames);

// ENDPOINT para CADASTRAR
gameRoutes.post("/games", gameController.createGame);

export default gameRoutes;