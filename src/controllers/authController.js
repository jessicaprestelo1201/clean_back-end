import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      console.log("Dados recebidos no registro:", { nome, email, senha });

      // Verificar se todos os campos obrigatórios estão presentes
      if (!nome || !email || !senha) {
        console.error("Erro: Nome, email ou senha ausentes.");
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
      }

      // Verificar se o email já está em uso
      const existingUser = await UserModel.findUserByEmail(email); // Corrigido aqui
      console.log("Usuário existente:", existingUser);

      if (existingUser) {
        console.error("Erro: Email já está em uso.");
        return res.status(400).json({ error: "Email já está em uso." });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(senha, 10);
      console.log("Senha criptografada:", hashedPassword);

      // Criar o usuário
      const user = await UserModel.createUser({ // Certifique-se de que o método correto está sendo usado
        nome,
        email,
        senha: hashedPassword,
      });

      console.log("Usuário criado com sucesso:", user);

      res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
      res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Verificar se todos os campos obrigatórios estão presentes
      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
      }

      // Buscar o usuário pelo email
      const user = await UserModel.findUserByEmail(email); // Corrigido aqui
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      // Verificar se a senha está correta
      const validPassword = await bcrypt.compare(senha, user.senha);
      if (!validPassword) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      // Gerar o token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login." });
    }
  }
}

export default new AuthController();