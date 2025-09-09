import userService from "../services/userService.js";
// Importando o JWT
import jwt from "jsonwebtoken";
// Segredo para o token (é recomendado que o segreja esteja nas variáveis de ambiente)
const JWTsecret = "apithegames";

//Função para CADASTRAR um usuário
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userService.Create(name, email, password);
    res.status(201).json({ sucess: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// Função para realizar LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getOne(email);
    if (user != undefined) {
      // Fazend a validação da senha
      if (user.password == password) {
        // Gerando o token com JWT (SENHA CORRETA)
        jwt.sign(
          { id: user.id, email: user.email },
          JWTsecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res.status(400).json({
                error: "Não foi possível gerar o token de autenticação.",
              });
            } else {
              // Token gerado com sucesso
              res.status(200).json({ token });
            }
          }
        );
      // Senha incorreta
      }else{
        res.status(401).json({error: "Credenciais inválidas!"})
        // Cód 401: UNAUTHORIZED - não autorizado
      }
    } else {
      res.status(404).json({ error: "Usuário não encontrado. " });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser, loginUser, JWTsecret };