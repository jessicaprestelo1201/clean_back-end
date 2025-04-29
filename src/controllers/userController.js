import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

class UserController {
  // Registrar um novo usuário
  static async register(req, res) {
    try {
      const { nome, email, senha, idioma } = req.body;
      const fotoPerfil = req.file ? req.file.filename : null;

      // Verificar se os campos obrigatórios estão presentes
      const missingFields = [];
      if (!nome) missingFields.push("nome");
      if (!email) missingFields.push("email");
      if (!senha) missingFields.push("senha");

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Os seguintes campos são obrigatórios: ${missingFields.join(
            ", "
          )}`,
        });
      }

      // Validação de senha
      const senhaRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\W).{8,}$/;
      if (!senhaRegex.test(senha)) {
        return res.status(400).json({
          error:
            "A senha deve ter pelo menos 8 caracteres, 2 letras maiúsculas e 1 símbolo.",
        });
      }

      // Verificar se o email já está em uso
      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        console.error(`Tentativa de registro com email já existente: ${email}`);
        return res
          .status(400)
          .json({ error: "Não foi possível registrar o usuário." });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criar o usuário
      const user = await userModel.createUser({
        nome,
        email,
        senha: hashedPassword,
        idioma,
        fotoPerfil,
      });

      res.status(201).json({
        message: `Olá ${nome}. Sua conta foi criada com sucesso!`,
        user,
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  }

  // Buscar todos os usuários
  static async getAllUsers(req, res) {
    try {
      const users = await userModel.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  }

  // Buscar um usuário pelo ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel.findUserById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  }

  // Login do usuário
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Verificar se o usuário existe
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida." });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login." });
    }
  }

  // Atualizar informações do usuário
  static async update(req, res) {
    try {
      const { nome, idioma } = req.body;
      const userId = req.userId;

      const updatedUser = await userModel.updateUser(userId, { nome, idioma });

      res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!", updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  // Excluir conta do usuário
  static async delete(req, res) {
    try {
      const userId = req.userId;

      await userModel.deleteUser(userId);

      res.status(200).json({ message: "Conta excluída com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir conta." });
    }
  }
}

export default UserController;
