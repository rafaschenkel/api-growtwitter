# API GrowTwitter

API RESTful para uma rede social estilo Twitter, construída com Node.js, Express e Prisma. Permite criação de usuários, publicações de tweets, seguir e deixar de seguir usuários, curtir e descurtir tweets e respostas.

## Funcionalidades

- Cadastro, login e consulta de usuários
- Publicação de tweets e respostas
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

## Endpoints Principais

### Usuários

- `POST /users` — Criar usuário  
- `POST /users/login` — Login  
- `GET /users/feed` — Obter feed de tweets do usuário e de quem ele segue (requer autenticação)  
- `GET /users/:userId` — Obter dados do usuário (com tweets, seguidores e seguindo) (requer autenticação)  
- `POST /users/follow/:followingId` — Seguir usuário (requer autenticação)  
- `DELETE /users/follow/:followingId` — Deixar de seguir usuário (requer autenticação)  

### Tweets

- `POST /tweets` — Criar tweet (requer autenticação)  
- `POST /tweets/:tweetId/reply` — Criar resposta a um tweet (requer autenticação)  
- `GET /tweets/:tweetId` — Obter tweet com respostas e contagens de curtidas e respostas (requer autenticação)  
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

