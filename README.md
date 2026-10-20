# DevBurguer API

Backend de um sistema de pedidos de lanchonete (projeto de portfólio). API REST em Node.js/Express, com autenticação JWT, upload de imagens, pagamentos via Stripe e dois bancos de dados (Postgres para catálogo/usuários, MongoDB para pedidos).

🔗 Repositório do front-end: [devburguer-interface](https://github.com/niccolaspeixoto/devburguer-interface)

## Stack

- **Node.js + Express** — API REST
- **Sequelize + PostgreSQL** — usuários, produtos e categorias
- **Mongoose + MongoDB** — pedidos
- **JWT** — autenticação
- **Multer + Cloudinary** — upload de imagens
- **Stripe** — pagamentos (modo de teste)

## Pré-requisitos

- Node.js 20+
- pnpm
- Uma instância de PostgreSQL e uma de MongoDB acessíveis (local ou na nuvem)

## Configuração

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Copie o `.env.example` para `.env` e preencha as variáveis:
   ```bash
   cp .env.example .env
   ```

   | Variável | Descrição |
   |---|---|
   | `STRIPE_SECRET_KEY` | Chave secreta do Stripe (modo teste: `sk_test_...`) |
   | `JWT_SECRET` | Chave usada para assinar os tokens JWT — gere uma string aleatória própria, nunca reaproveite exemplos |
   | `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` | Conexão com o Postgres |
   | `DB_SSL` | `true` se o Postgres exigir SSL (bancos gerenciados como Neon/Supabase exigem) |
   | `MONGO_URL` | Connection string do MongoDB |
   | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Credenciais do Cloudinary (upload de imagens) |

3. Rode as migrations do Postgres:
   ```bash
   pnpm run migrate
   ```

## Rodando localmente

```bash
pnpm dev
```

Sobe em `http://localhost:3001` com watch mode (reinicia sozinho a cada alteração).

Para rodar como em produção (sem watch mode):
```bash
pnpm start
```

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `pnpm dev` | Roda em modo desenvolvimento, com reload automático |
| `pnpm start` | Roda em modo produção |
| `pnpm run migrate` | Aplica as migrations pendentes no Postgres |
| `pnpm run migrate:undo` | Desfaz a última migration |

## Rotas principais

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/session` | Público | Login, retorna token JWT |
| POST | `/users` | Público | Cadastro de usuário |
| GET | `/products` | Autenticado | Lista produtos |
| POST | `/create-products` | Admin | Cria produto (com upload de imagem) |
| PUT | `/update-products/:id` | Admin | Edita produto |
| DELETE | `/delete-products/:id` | Admin | Exclui produto |
| GET | `/categories` | Autenticado | Lista categorias |
| POST | `/create-categories` | Admin | Cria categoria (com upload de imagem) |
| PUT | `/update-categories/:id` | Admin | Edita categoria |
| POST | `/create-orders` | Autenticado | Cria pedido |
| PUT | `/update-orders/:id` | Admin | Atualiza status do pedido |
| GET | `/orders` | Admin | Lista todos os pedidos |
| POST | `/create-payment-intent` | Autenticado | Cria PaymentIntent no Stripe |

Rotas autenticadas esperam o header `Authorization: Bearer <token>`.

## Deploy

Hospedado no [Render](https://render.com) (free tier), com Postgres no [Neon](https://neon.tech), MongoDB no [Atlas](https://www.mongodb.com/atlas) e imagens no [Cloudinary](https://cloudinary.com) — todos free tier.

- Build command: `pnpm install`
- Start command: `pnpm start`
- Variáveis de ambiente: as mesmas do `.env.example`, configuradas no painel do Render.

## Pagamentos em modo de teste

O Stripe está configurado em **modo de teste**. Use os [cartões de teste oficiais](https://stripe.com/docs/testing) (ex: `4242 4242 4242 4242`, qualquer data futura, qualquer CVC) para simular pagamentos — nenhuma cobrança real é feita.
