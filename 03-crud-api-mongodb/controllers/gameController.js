import gameService from "../services/gameService.js";

// Função para LISTAR jogos
const getAllgames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    // Código 200 OK - Requisição feita com sucesso
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para CADASTRAR jogos
const createGame = async (req, res) => {
  try {
    const { title, year, genre, platform, price } = req.body;
    await gameService.Create(title, year, genre, platform, price);
    res.sendStatus(201); // Código 201 (CREATED) : Recurso criado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default { getAllgames, createGame };
