# Clean Backend - API de Usuários

Este documento contém instruções para testar as operações CRUD de usuários utilizando o Postman. O projeto é uma API RESTful construída com Node.js, Express e Prisma.

## Configuração Inicial

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o arquivo `.env` com suas variáveis de ambiente.
4. Execute as migrações do Prisma: `npx prisma migrate dev`.
5. Inicie o servidor: `npm run dev`.

---

## Testando Endpoints no Postman

### 1. Registrar Novo Usuário
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
- **Resposta Esperada:**  
    ```json
    {
        "message": "Usuário registrado com sucesso!",
        "user": {
            "id": "123abc",
            "nome": "João Silva",
            "email": "joao@email.com",
            "idioma": "pt-BR",
            "fotoPerfil": null,
            "createdAt": "2025-04-29T12:00:00.000Z",
            "updatedAt": "2025-04-29T12:00:00.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **Observações:**  
    - A senha deve ter pelo menos 8 caracteres, 2 letras maiúsculas e 1 símbolo.
    - Guarde o token retornado para usar nas próximas requisições.

---

### 2. Login de Usuário
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
- **Resposta Esperada:**  
    ```json
    {
        "message": "Login bem-sucedido! Bem vindo João Silva",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

---

### 3. Buscar Todos os Usuários
- **Método:** `GET`  
- **URL:** `http://localhost:4000/user`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
- **Resposta Esperada:**  
    ```json
    {
        "message": "Usuários encontrados com sucesso!",
        "users": [
            {
                "id": "123abc",
                "nome": "João Silva",
                "email": "joao@email.com",
                "idioma": "pt-BR",
                "fotoPerfil": null,
                "createdAt": "2025-04-29T12:00:00.000Z",
                "updatedAt": "2025-04-29T12:00:00.000Z"
            }
        ]
    }
    ```

---

### 4. Buscar Usuário por ID
- **Método:** `GET`  
- **URL:** `http://localhost:4000/user/123abc`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
- **Resposta Esperada:**  
    ```json
    {
        "message": "Usuário com ID 123abc encontrado com sucesso!",
        "user": {
            "id": "123abc",
            "nome": "João Silva",
            "email": "joao@email.com",
            "idioma": "pt-BR",
            "fotoPerfil": null,
            "createdAt": "2025-04-29T12:00:00.000Z",
            "updatedAt": "2025-04-29T12:00:00.000Z"
        }
    }
    ```

---

### 5. Atualizar Usuário

#### 5.1 Atualização de Dados (sem foto)
- **Método:** `PUT`  
- **URL:** `http://localhost:4000/user/update`  
- **Headers:**  
    - `Content-Type: application/json`  
    - `Authorization: Bearer <seu_token>`  
- **Body:**  
    ```json
    {
        "nome": "João Silva Atualizado",
        "senha": "NOvaSEnha@@456",
        "idioma": "en-US"
    }
    ```

#### 5.2 Atualização com Foto
- **Método:** `PUT`  
- **URL:** `http://localhost:4000/user/update`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
- **Body (form-data):**  
    - `nome`: João Silva Atualizado  
    - `senha`: NOvaSEnha@@456  
    - `idioma`: en-US  
    - `fotoPerfil`: [selecione arquivo]  

- **Resposta Esperada:**  
    ```json
    {
        "message": "Usuário com ID 123abc atualizado com sucesso!",
        "updatedUser": {
            "id": "123abc",
            "nome": "João Silva Atualizado",
            "email": "joao@email.com",
            "idioma": "en-US",
            "fotoPerfil": "uploaded_filename.jpg",
            "createdAt": "2025-04-29T12:00:00.000Z",
            "updatedAt": "2025-04-30T12:00:00.000Z"
        },
        "lastUpdated": "A última atualização foi feita há 0 dia(s)."
    }
    ```

---

### 6. Excluir Conta de Usuário
- **Método:** `DELETE`  
- **URL:** `http://localhost:4000/user/delete`  
- **Headers:**  
    - `Authorization: Bearer <seu_token>`  
- **Resposta Esperada:**  
    ```json
    {
        "message": "Conta do usuário com ID 123abc excluída com sucesso!"
    }
    ```

---

## Solução de Problemas Comuns

### Erros de Autenticação (401)
- Verifique se o token está formatado corretamente: `Bearer <seu_token>`.
- Certifique-se de que o token não expirou.
- Faça login novamente para obter um novo token.

### Erros de Validação (400)
- **Para senhas:** Certifique-se de incluir pelo menos 8 caracteres, 2 letras maiúsculas e 1 símbolo.  
- **Para emails:** Use um email válido e que não esteja em uso.

### Erros de Banco de Dados (500)
- Verifique se as migrações do Prisma foram executadas.
- Certifique-se de que o banco de dados está acessível e funcionando.

### Erro "Usuário não encontrado" (404)
- Verifique se está usando o ID correto.
- Certifique-se de que o usuário não foi excluído.

---

## Fluxo de Testes Recomendado
1. Registre um usuário.
2. Faça login para obter um token.
3. Liste todos os usuários.
4. Busque um usuário pelo ID.
5. Atualize as informações do usuário.
6. (Opcional) Exclua o usuário.

Esperamos que este guia seja útil para testar a API. Para mais informações, consulte a documentação do projeto.  