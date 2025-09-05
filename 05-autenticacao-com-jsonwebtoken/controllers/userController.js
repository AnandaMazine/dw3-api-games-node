import userService from "../services/userService.js";

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
    const user = await userService.getOne(email)
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser };
