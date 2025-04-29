import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

class UserController {
  static async register(req, res) {
    try {
      const { nome, email, senha, idioma } = req.body;

      // Verificar se o usuário já existe
      const userExists = await userModel.findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso." });
      }

      // Validar a senha
      const senhaRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\W).{8,}$/;
      if (!senhaRegex.test(senha)) {
        return res.status(400).json({
          error:
            "A senha deve ter pelo menos 8 caracteres, 2 letras maiúsculas e 1 símbolo.",
        });
      }

      // Criptografar a senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Criar o novo usuário
      const newUser = {
        nome,
        email,
        senha: senhaHash,
        idioma: idioma || "pt-BR",
        fotoPerfil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdUser = await userModel.createUser(newUser);

      // Gerar token JWT
      const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        message: "Usuário registrado com sucesso!",
        user: { ...createdUser, senha: undefined }, // Não retorna a senha
        token,
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
      res
        .status(200)
        .json({ message: "Usuários encontrados com sucesso!", users });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  }

  // Buscar um usuário pelo ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel.findUserById(id);
      if (!user) {
        return res
          .status(404)
          .json({ error: `Usuário com ID ${id} não encontrado.` });
      }

      res.status(200).json({
        message: `Usuário com ID ${id} encontrado com sucesso!`,
        user,
      });
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
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
        return res
          .status(404)
          .json({ error: `Usuário com email ${email} não encontrado.` });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .json({ message: `Login bem-sucedido! Bem vindo ${user.nome}`, token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: "Erro ao fazer login." });
    }
  }

  // Atualizar informações do usuário
  static async update(req, res) {
    try {
      const { nome, senha, idioma } = req.body;
      const fotoPerfil = req.file ? req.file.filename : null;
      const userId = req.userId;

      // Obter o usuário atual
      const user = await userModel.findUserById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ error: `Usuário com ID ${userId} não encontrado.` });
      }

      // Validação de senha (se for enviada)
      if (senha) {
        const senhaRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\W).{8,}$/;
        if (!senhaRegex.test(senha)) {
          return res.status(400).json({
            error:
              "A senha deve ter pelo menos 8 caracteres, 2 letras maiúsculas e 1 símbolo.",
          });
        }
      }

      // Atualizar os campos permitidos
      const updatedData = {
        ...(nome && { nome }),
        ...(senha && { senha: await bcrypt.hash(senha, 10) }),
        ...(idioma && { idioma }),
        ...(fotoPerfil && { fotoPerfil }),
        updatedAt: new Date(),
      };

      // Atualizar o usuário no banco de dados
      const updatedUser = await userModel.updateUser(userId, updatedData);

      // Calcular a diferença de dias desde a última atualização
      const lastUpdated = new Date(updatedUser.updatedAt);
      const today = new Date();
      const diffTime = Math.abs(today - lastUpdated);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      res.status(200).json({
        message: `Usuário com ID ${userId} atualizado com sucesso!`,
        updatedUser,
        lastUpdated: `A última atualização foi feita há ${diffDays} dia(s).`,
      });
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${req.userId}:`, error);
      res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  // Excluir conta do usuário
  static async delete(req, res) {
    try {
      const userId = req.userId;

      const user = await userModel.findUserById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ error: `Usuário com ID ${userId} não encontrado.` });
      }

      await userModel.deleteUser(userId);

      res.status(200).json({
        message: `Conta do usuário com ID ${userId} excluída com sucesso!`,
      });
    } catch (error) {
      console.error(
        `Erro ao excluir conta do usuário com ID ${req.userId}:`,
        error
      );
      res.status(500).json({ error: "Erro ao excluir conta do usuário." });
    }
  }
}

export default UserController;
