import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

class UserController {
  // Registrar um novo usuário
  static async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      // Validação de senha
      const senhaRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\W).{8,}$/;
      if (!senhaRegex.test(senha)) {
        return res.status(400).json({
          error: "A senha deve ter pelo menos 8 caracteres, 2 letras maiúsculas e 1 símbolo.",
        });
      }

      // Verificar se o email já está em uso
      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso." });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criar o usuário
      const user = await userModel.createUser({ nome, email, senha: hashedPassword });

      res.status(201).json({ message: "Usuário registrado com sucesso!", user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário." });
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

      res.status(200).json({ message: "Usuário atualizado com sucesso!", updatedUser });
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