import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb"; // Biblioteca do MongoDB - Verifica se a ID é válida

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
    const { title, year, price, descriptions } = req.body;
    await gameService.Create(title, year, price, descriptions);
    res.sendStatus(201); // Código 201 (CREATED) : Recurso criado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para DELETAR jogos
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await gameService.Delete(id);
      res.sendStatus(204); // Código 204 (NO CONTENT) - Requisição bem sucedida, mas não há conteúdo para retornar.
    } else {
      // Se o ID não for válido
      res.status(400).json({ error: "A ID enviada é invalida." });
      // Código 400 (BAD REQUEST) - Requisição mal formada
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });

    //res.status(500).json({}) -> para enviar json junto
    //res.sendStatus(500) -> somente código de status
  }
};

// Função para ALTERAR jogos
const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, price, descriptions } = req.body;
      const game = await gameService.Update(
        id,
        title,
        year,
        price,
        descriptions
      );
      res.status(200).json({ game }); // Código 200 - OK
    } else {
      res.sendStatus(400); // Código 400 (BAD REQUEST)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para BUSCAR um ÚNICO jogo
const getOneGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      // pego a id da url e vejo se é válido
      const id = req.params.id; // se for, eu salvo a id numa variável
      const game = await gameService.getOne(id);
      if (!game) {
        // id é compatível com o modelo do banco mas não tem no banco
        res.status(404).json({ error: "O jogo não foi encontrado." }); // NOT FOUND: Não encontrado
      } else {
        res.status(200).json({ game });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida." }); // BAD REQUEST: Requisição inválida
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Erro interno do servidor
  }
};

export default { getAllgames, createGame, deleteGame, updateGame, getOneGame };
