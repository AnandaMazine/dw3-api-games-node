import userService from "../services/userService.js";
// Importando o JWT
import jwt from "jsonwebtoken";
// Importando o bcrypt (para fazer o hash da senha)
import bcrypt from "bcrypt";
// Importando dotenv (variáveis de ambiente)
import dotenv from "dotenv";
dotenv.config();
// Segredo para o token (é recomendado que o segreja esteja nas variáveis de ambiente)
const JWTsecret = process.env.JWTSECRET;

//Função para CADASTRAR um usuário
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // VERIFICAR SE O USUÁRIO JÁ EXISTE
    const user = await userService.getOne(email);
    // SE NÃO HOUVER USUÁRIO JÁ CADASTRADO
    if (user == undefined) {
      // AQUI SERÁ FEITO O HASH DA SENHA
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      // Cadastrando o usuário
      await userService.Create(name, email, hash);
      res.status(201).json({ sucess: "Usuário cadastrado com sucesso!" });
      // SE O USUÁRIO JÁ ESTIVER CADASTRADO
    } else {
      res.status(409).json({ error: "Usuário informado já está cadastrado." });
      // Cód. 409: CONFLICT
    }
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
      // Comparando o hash de senha
      const correct = bcrypt.compareSync(password, user.password);
      // Se a senha for válida
      if (correct) {
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
      } else {
        res.status(401).json({ error: "Credenciais inválidas!" });
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
