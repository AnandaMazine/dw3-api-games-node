import Game from "../models/Games.js";

// O service será responsável por conter os métodos de manipulação do banco.

class gameService {
  // classe
  // Buscando os registros do banco
  async getAll() {
    //método
    try {
      const games = await Game.find(); // cria uma variável e pede para esperar pela busca
      return games;
    } catch (error) {
      console.log(error);
    }
  }
  // Cadastrando registros no banco
  async Create(title, year, genre, platform, price) {
    try {
      const newGame = new Game({
        title,
        year,
        genre,
        platform,
        price,
      });
      await newGame.save(); //save - método do mongoose para cadastrar no banco
    } catch (error) {
      console.log(error);
    }
  }
}

export default new gameService();
