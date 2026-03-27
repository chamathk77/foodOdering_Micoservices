# Food Ordering Backend (Microservices)

MVP microservice backend: **User**, **Menu**, **Order**, and **Payment** services (Express + Mongoose + Swagger), plus an **API Gateway** (`http-proxy-middleware`).

## Folder structure

```
MTIT_Project/
├── gateway/                 # Port 3000
├── user-service/            # Port 3001
├── menu-service/            # Port 3002
├── order-service/           # Port 3003
└── payment-service/         # Port 3004
```

Each microservice contains:

- `app.js` — Express app entry
- `config/db.js` — MongoDB connection string and `mongoose.connect` (edit URI here, not in `.env`)
- `models/` — Mongoose schemas
- `routes/` — Route definitions + OpenAPI JSDoc
- `controllers/` — CRUD handlers
- `middleware/` — Validation + error handler
- `swagger.js` — swagger-jsdoc spec
- `.env.example` — copy to `.env` for `PORT` only (optional; defaults exist in code)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A reachable MongoDB instance (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas)). The connection string is set in each service’s `config/db.js`.

## One-time setup

In **each** of the five folders (`gateway`, `user-service`, `menu-service`, `order-service`, `payment-service`):

```bash
npm install
copy .env.example .env
```

On macOS/Linux use `cp .env.example .env` instead of `copy`.

Edit each service’s `config/db.js` if you change cluster, credentials, or database name. Edit `.env` only if you need a custom `PORT`.

## How to run

Ensure your MongoDB (Atlas or local) allows connections from your machine, then start all four microservices (four terminals), then the gateway.

**Terminal 1 — User service (3001)**

```bash
cd user-service
npm start
```

**Terminal 2 — Menu service (3002)**

```bash
cd menu-service
npm start
```

**Terminal 3 — Order service (3003)**

```bash
cd order-service
npm start
```

**Terminal 4 — Payment service (3004)**

```bash
cd payment-service
npm start
```

**Terminal 5 — API Gateway (3000)**

```bash
cd gateway
npm start
```

### Access patterns

| Resource   | Direct service                         | Via gateway                          |
|-----------|----------------------------------------|--------------------------------------|
| Users     | `http://localhost:3001/users`          | `http://localhost:3000/users`         |
| Menu      | `http://localhost:3002/menu`           | `http://localhost:3000/menu`          |
| Orders    | `http://localhost:3003/orders`         | `http://localhost:3000/orders`       |
| Payments  | `http://localhost:3004/payments`       | `http://localhost:3000/payments`     |

**Swagger UI** (per service, not on the gateway):

- `http://localhost:3001/api-docs` — User  
- `http://localhost:3002/api-docs` — Menu  
- `http://localhost:3003/api-docs` — Order  
- `http://localhost:3004/api-docs` — Payment  

Gateway health: `GET http://localhost:3000/health`

## MongoDB (database & collections)

All microservices use the same Atlas **database name** `mtit_project` (URI in each service’s `config/db.js`). Each domain has its **own collection**, set on the Mongoose schema:

| Service | Collection name |
|---------|-----------------|
| user-service | `user` |
| menu-service | `menu` |
| order-service | `order` |
| payment-service | `payment` |

`user` documents enforce **unique** `email` at the schema level.

## API summary

- **User:** `name`, `email`, `phone`, `address`
- **Menu:** `name`, `price`, `category`, `availability`
- **Order:** `userId`, `items` (string IDs), `totalAmount`, `status` (`pending` \| `completed` \| `cancelled`)
- **Payment:** `orderId`, `amount`, `paymentMethod`, `status` (`paid` \| `failed`)

All list/create responses use `{ success, data }` (or `message` on delete). Validation errors return `400` with `errors[]`.
