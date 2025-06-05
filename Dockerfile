FROM node:22-alpine3.21

WORKDIR /app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar TODOS os arquivos do projeto
COPY . .

# Criar diretório para SQLite
RUN mkdir -p data

# Gerar cliente Prisma
RUN npx prisma generate

EXPOSE 4102

# Comando que executa migração, seed e start
CMD ["sh", "-c", "npx prisma db push && npm run seed && npm run start"]