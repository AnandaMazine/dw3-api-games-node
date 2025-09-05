import mongoose from "mongoose";
// Usuário e senha do banco de dados
const dbUser = "anandacristine1_db_user";
const dbPassword = "nfCOpemwP1POni6j";
const dbName = "api-thegames";
const connect = () => {
  mongoose.connect(
    `mongodb+srv://anandacristine1_db_user:nfCOpemwP1POni6j@cluster0.l6ksqur.mongodb.net/api-thegames?retryWrites=true&w=majority&appName=Cluster0`
  );

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.log("Erro ao conectar com o mongoDB.");
  });
  connection.on("open", () => {
    console.log("Conectado ao mongoDB com sucesso!");
  });
};
connect();
export default mongoose;