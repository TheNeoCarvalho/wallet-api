# Carteira Financeira

API de Carteira Financeira desenvolvida em **NestJS** com **arquitetura hexagonal**, **TypeORM**, **PostgreSQL**, **JWT**, **Swagger** e testes automatizados.

---

## Tecnologias

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Docker + Docker Compose
- Swagger
- JWT Authentication
- Arquitetura Hexagonal
- Testes Unitários e de Integração

---

## Estrutura dos Domínios

- **User**: Cadastro e login de usuários.
- **Wallet**: Carteiras vinculadas a cada usuário.
- **Transaction**: Transferência e reversão de transações entre carteiras.

---

## Como rodar o projeto com Docker

### 1. Clone o repositório
```bash
git clone https://github.com/theneocarvalho/wallet-api.git
cd wallet-api
```

## Crie um arquivo .env
```bash
### API
PORT=
API_VERSION=
BASE_URL=http://localhost:${PORT}
API_URL=${BASE_URL}/api/${API_VERSION}

## DB
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:{POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

## JWT
JWT_SECRET=
JWT_EXPIRES_IN=1d
```

## Suba o ambiente com Docker
```bash
docker-compose up -d --build
```

## Documentação Swagger
Acesse: http://localhost:3000/api/docs

## Testes
### Testes Unitários
```bash
docker exec -it api npm run test
```
### Testes de Integração (e2e)
```bash
docker exec -it api npm run test:e2e
```

## Rotas Principais

| Método | Rota                       | Descrição                          |
|--------|----------------------------|-------------------------------------|
| POST   | /api/auth/register             | Cadastra um novo usuário            |
| POST   | /api/auth/login                | Realiza login e retorna token       |
| GET    | /api/wallets/me                | Consulta carteira do usuário        |
| POST   | /api/transactions/transfer     | Realiza uma transferência           |
| POST   | /api/transactions/revert/:id   | Reverte uma transação enviada       |
