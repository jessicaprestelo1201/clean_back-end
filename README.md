# Clean Backend - API de Usuários

Este documento contém instruções para testar as operações CRUD de usuários utilizando o Postman. O projeto é uma API RESTful construída com Node.js, Express e Prisma.

---

## Configuração Inicial

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o arquivo `.env` com suas variáveis de ambiente.
4. Execute as migrações do Prisma: `npx prisma migrate dev`.
5. Inicie o servidor: `npm run dev`.

---

## Testando Endpoints no Postman

### **Rotas de Usuários**

#### 1. Registrar Novo Usuário
- **Método:** `POST`  
- **URL:** `http://localhost:4000/auth/register`  
- **Headers:**  
    - `Content-Type: application/json`  
- **Body:**  
    ```json
    {
        "nome": "João Silva",
        "email": "joao@email.com",
        "senha": "SEnha@@123",
        "idioma": "pt-BR"
    }
    ```

#### 2. Login de Usuário
- **Método:** `POST`  
- **URL:** `http://localhost:4000/auth/login`  
- **Headers:**  
    - `Content-Type: application/json`  
- **Body:**  
    ```json
    {
        "email": "joao@email.com",
        "senha": "SEnha@@123"
    }
    ```

#### 3. Buscar Todos os Usuários
- **Método:** `GET`  
- **URL:** `http://localhost:4000/user`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  

#### 4. Buscar Usuário por ID
- **Método:** `GET`  
- **URL:** `http://localhost:4000/user/:id`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  

#### 5. Atualizar Usuário
- **Método:** `PUT`  
- **URL:** `http://localhost:4000/user/update`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
    - `Content-Type: application/json`  
- **Body:**  
    ```json
    {
        "nome": "João Silva Atualizado",
        "senha": "NOvaSEnha@@456",
        "idioma": "en-US"
    }
    ```

#### 6. Excluir Conta de Usuário
- **Método:** `DELETE`  
- **URL:** `http://localhost:4000/user/delete`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  

---

### **Rotas de Comentários**

#### 1. Criar Comentário
- **Método:** `POST`  
- **URL:** `http://localhost:4000/comments`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
    - `Content-Type: application/json`  
- **Body:**  
    ```json
    {
        "produtoId": 1,
        "content": "Ótimo produto!"
    }
    ```

#### 2. Listar Comentários por Produto
- **Método:** `GET`  
- **URL:** `http://localhost:4000/comments/product/:produtoId`  

#### 3. Deletar Comentário
- **Método:** `DELETE`  
- **URL:** `http://localhost:4000/comments/:id`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  

---

### **Rotas de Likes**

#### 1. Curtir Produto
- **Método:** `POST`  
- **URL:** `http://localhost:4000/likes`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
    - `Content-Type: application/json`  
- **Body:**  
    ```json
    {
        "produtoId": 1
    }
    ```

#### 2. Listar Likes por Produto
- **Método:** `GET`  
- **URL:** `http://localhost:4000/likes/product/:produtoId`  

#### 3. Remover Like
- **Método:** `DELETE`  
- **URL:** `http://localhost:4000/likes/:id`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  

---

### **Rotas de Produtos**

#### 1. Criar Produto
- **Método:** `POST`  
- **URL:** `http://localhost:4000/products`  
- **Headers:**  
    - `Content-Type: application/json`  
- **Body:**  
    ```json
    {
        "name": "Produto A",
        "description": "Descrição do Produto A",
        "price": 99.99
    }
    ```

#### 2. Listar Produtos
- **Método:** `GET`  
- **URL:** `http://localhost:4000/products`  

#### 3. Obter Produto por ID
- **Método:** `GET`  
- **URL:** `http://localhost:4000/products/:id`  

---

### **Rotas de Autenticação**

#### 1. Registrar
- **Método:** `POST`  
- **URL:** `http://localhost:4000/auth/register`  
- **Body:**  
    ```json
    {
        "name": "Maria Silva",
        "email": "maria.silva@email.com",
        "password": "senha123"
    }
    ```

#### 2. Login
- **Método:** `POST`  
- **URL:** `http://localhost:4000/auth/login`  
- **Body:**  
    ```json
    {
        "email": "maria.silva@email.com",
        "password": "senha123"
    }
    ```

---

## Dicas sobre o Token

- O token deve ser enviado no cabeçalho de autenticação no formato:  
    `Authorization: Bearer <seu_token>`.
- Tokens têm um tempo de expiração. Caso receba um erro 401, faça login novamente para obter um novo token.
- Nunca compartilhe seu token publicamente.

---

## Solução de Problemas Comuns

- **Erro 401 (Não autorizado):** Verifique se o token está correto e válido.
- **Erro 400 (Validação):** Confirme se os dados enviados atendem aos requisitos.
- **Erro 500 (Servidor):** Certifique-se de que o banco de dados está configurado corretamente.

---

## Fluxo de Testes Recomendado

1. Registre um usuário.
2. Faça login para obter o token.
3. Liste todos os usuários.
4. Busque um usuário pelo ID.
5. Atualize as informações do usuário.
6. Exclua o usuário, se necessário.

Esperamos que este guia seja útil para testar a API.  