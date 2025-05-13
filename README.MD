## Funcionalidades Implementadas

### Autenticação
- Registro de usuários com hash de senha utilizando `bcrypt`.
- Login de usuários com geração de tokens JWT para autenticação.

### Produtos
- Criação de produtos.
- Listagem de todos os produtos.
- Busca de produtos por ID.

### Curtidas
- Curtir produtos.
- Listar curtidas por produto.
- Remover curtidas.

### Comentários
- Criar comentários em produtos.
- Listar comentários por produto.
- Deletar comentários.

### Posts
- Simulação de CRUD em memória para posts:
  - Listar todos os posts.
  - Criar novos posts.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **Prisma**: ORM para interação com o banco de dados.
- **SQLite**: Banco de dados utilizado no projeto.
- **JWT**: Para autenticação baseada em tokens.
- **Bcrypt**: Para hash de senhas.
- **Nodemon**: Para reiniciar o servidor automaticamente durante o desenvolvimento.

## Estrutura do Banco de Dados

O banco de dados é gerenciado pelo Prisma e possui os seguintes modelos:

### User (Usuário)
- `id`: Identificador único (UUID).
- `nome`: Nome do usuário.
- `email`: Email único.
- `senha`: Senha do usuário (hash).
- `idioma`: Idioma preferido (opcional).
- `fotoPerfil`: URL da foto de perfil (opcional).
- `verificado`: Indica se o usuário está verificado.
- Relacionamentos:
  - Um para muitos com `Like` (curtidas).
  - Um para muitos com `Comment` (comentários).

### Product (Produto)
- `id`: Identificador único (UUID).
- `nome`: Nome do produto.
- `descricao`: Descrição do produto (opcional).
- `preco`: Preço do produto.
- Relacionamentos:
  - Um para muitos com `Like` (curtidas).
  - Um para muitos com `Comment` (comentários).

### Like (Curtida)
- `id`: Identificador único (UUID).
- `usuarioId`: Referência ao usuário que curtiu.
- `produtoId`: Referência ao produto curtido.

### Comment (Comentário)
- `id`: Identificador único (UUID).
- `conteudo`: Conteúdo do comentário.
- `usuarioId`: Referência ao usuário que comentou.
- `produtoId`: Referência ao produto comentado.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/jessicaprestelo1201/clean_back-end.git
   cd clean_back-end


2. Instale as dependências:
- npm install


3. Configure o arquivo .env com as variáveis de ambiente necessárias, como DATABASE_URL e JWT_SECRET.


4. Execute as migrações do Prisma para criar o banco de dados:
- npx prisma migrate dev


5. Inicie o servidor:
- npm run dev 


6. Acesse a API em http://localhost:3001.



*Rotas da API*

- Autenticação:
 POST /api/auth/register: Registro de usuários.
 POST /api/auth/login: Login de usuários.

- Produtos:
 POST /api/products: Criação de produtos.
 GET /api/products: Listagem de produtos.
 GET /api/products/:id: Busca de produto por ID.

- Curtidas:
 POST /api/likes: Curtir um produto.
 GET /api/likes/:produtoId: Listar curtidas de um produto.
 DELETE /api/likes/:id: Remover curtida.

- Comentários:
 POST /api/comments: Criar comentário.
 GET /api/comments/:produtoId: Listar comentários de um produto.
 DELETE /api/comments/:id: Deletar comentário.

- Posts:
 GET /api/posts: Listar posts.
 POST /api/posts: Criar post.