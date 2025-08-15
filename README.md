# Shield Technical Task – API
Backend Development with Express, TypeScript, and PostgreSQL

## Requirements
- Node 18+
- PostgreSQL 13+
- (Opcional) Docker para DB

## Setup
1. `cp .env.example .env` y ajusta `DATABASE_URL` y `JWT_SECRET`.
2. `npm i`
3. `npm run prisma:generate`
4. `npm run prisma:migrate` (crea tablas)
5. (Opcional) `npm run seed` (crea admin@example.com / admin123)
6. `npm run dev`

API en: `http://localhost:3000/api`

## Endpoints

### Auth
- **POST /api/signin**
  - Body: `{ "email": "admin@example.com", "password": "admin123" }`
  - Res: `{ "token": "..." }`
- **POST /api/signout** (requiere Bearer Token)
  - Res: `{ "success": true }`

### Wallets (Bearer Token)
- **GET /api/wallets**
- **POST /api/wallets**
  - Body: `{ "tag": "My ETH", "chain": "ethereum", "address": "0x..." }`
- **GET /api/wallets/:id**
- **PUT /api/wallets/:id**
  - Body parcial, ej: `{ "tag": "Work" }`
- **DELETE /api/wallets/:id**

## Notas de Seguridad
- Passwords con bcrypt.
- JWT en Authorization: `Bearer <token>`.
- Acceso a wallets restringido por `userId`.

