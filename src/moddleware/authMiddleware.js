import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar se o Token Existe
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  // Retirar o Token do Bearer Token
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token com erro(s) de formatação!" });
  }

  const [schema, token] = parts;

  // Verificar se o esquema é Bearer
  if (schema !== "Bearer") {
    return res.status(401).json({ error: "Token mal formatado!" });
  }

  // Validação do Token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token não é válido!" });
    }

    req.userId = decoded.id;
    return next();
  });
};

export default authMiddleware;