import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.senha, 10);
      const user = await UserModel.create({
        ...req.body,
        senha: hashedPassword
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  async login(req, res) {
    try {
      const user = await UserModel.findByEmail(req.body.email);
      if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

      const validPassword = await bcrypt.compare(req.body.senha, user.senha);
      if (!validPassword) return res.status(401).json({ error: "Credenciais inválidas" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

export default new AuthController();