import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token inválido ou não fornecido" });
  }

  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token inválido ou não fornecido" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Erro interno: segredo JWT não configurado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;