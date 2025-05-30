# API GrowTwitter

API RESTful para uma rede social estilo Twitter, construída com Node.js, Express e Prisma. Permite criação de usuários, publicações de tweets, seguir/desseguir usuários, likes e respostas.

## Funcionalidades

- Cadastro, login e consulta de usuários
- Publicação de tweets e respostas (replies)
- Seguir e deixar de seguir usuários
- Curtir e descurtir tweets
- Feed com tweets do usuário e seus seguidores
- Tratamento de erros e autenticação JWT

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação

## Requisitos

- Node.js v18+
- PostgreSQL instalado e configurado
- Yarn ou npm

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/rafaschenkel/api-growtwitter.git
cd api-growtwitter
````

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env` com as seguintes variáveis (exemplo):

```
PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/growtwitter
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

4. Gere o banco e rode as migrations

```bash
npx prisma migrate dev --name init
```

5. Inicie o servidor

```bash
npm run dev
```

## Endpoints Principais

### Usuários

- `POST /users` — Criar usuário  
- `POST /users/login` — Login  
- `GET /users/feed` — Obter feed de tweets do usuário e seus seguindo (requer autenticação)  
- `GET /users/:userId` — Obter dados do usuário (com tweets, seguidores e seguindo) (requer autenticação)  
- `POST /users/follow/:followingId` — Seguir usuário (requer autenticação)  
- `DELETE /users/follow/:followingId` — Deixar de seguir usuário (requer autenticação)  

### Tweets

- `POST /tweets` — Criar tweet (requer autenticação)  
- `POST /tweets/:tweetId/reply` — Criar reply a um tweet (requer autenticação)  
- `GET /tweets/:tweetId` — Obter tweet com replies e contagens (requer autenticação)  
- `POST /tweets/:tweetId/like` — Curtir tweet (requer autenticação)  
- `DELETE /tweets/:tweetId/like` — Descurtir tweet (requer autenticação)  


## Estrutura do Projeto

* `src/controllers` — Controllers das rotas
* `src/routes` — Definição das rotas
* `src/services` — Lógica de negócio
* `src/dtos` — Data Transfer Objects para validação e resposta
* `src/database` — Configuração do Prisma
* `src/middlewares` — Middlewares, incluindo autenticação e validação
* `src/model` — Modelos e erros customizados
* `src/utils` — Utilitários (hash de senha, comparação, JWT)

