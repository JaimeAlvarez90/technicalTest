# Shield Technical Task – API
Backend Development with Express, TypeScript, and PostgreSQL

## 0 Requirements
- **Node.js** ≥ 18
- **npm** (or **pnpm/yarn**)
- **Docker** + **Docker Compose**
- **Postman** (optional, for testing)

## 1 Clone & Install
```bash
git clone <REPO_URL>
cd <PROJECT_DIR>
npm install
```

## 2 Create database with docker
```bash
docker compose up -d
```
## 3 Run Prisma Migrations and Seed
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```
You should see something like: Seed ready: admin@example.com / admin123

## 4 Start Server and verify the health
```bash
npm run dev
```
Use the Postman collection to test the **/health** url.

## 4 Sign In and Get Token
In Postman, sent POST request:
```bash
POST http://localhost:3000/api/auth/signin

Body: 
{
  "email": "admin@example.com",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1..."
}
```
Copy this token and replace in every routes in the Authorization header. 

Then the token will leave you to make request for 1h to the following  routes:

```bash
TOKEN: For all this request you should add the Bearer Token in Authentication section.

Auth:
POST {{base_url}}/auth/signin To signin and get the token.
POST {{base_url}}/auth/signout

Users:
GET {{base_url}}/users/ to list users
GET {{base_url}}/users/:id to get user by id in params attach the id
POST {{base_url}}/users/ to create a new user
PUT {{base_url}}/users/:id in params attach the id to update the user
DELETE {{base_url}}/users/:id in params attach the id to delete the user

Example: 
{
  "email": "user1@example.com",
  "password": "secret123"
}

Wallet
GET {{base_url}}/wallets/ to list wallets
Example:
{
  "tag": "btc-wallet",
  "chain": "bitcoin",
  "address": "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
}

GET {{base_url}}/wallets/:id to get wallet by id in params attach the id
POST {{base_url}}/wallets/ to create a new wallet
PUT {{base_url}}/wallets/:id in params attach the id to update the wallet
Example:

{
  "tag": "eth-wallet-main",
  "chain": "ethereum",
  "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
}


DELETE {{base_url}}/wallets/:id in params attach the id to delete the wallet
```
In Postman I already create two variables 
{{base_url}} = http://localhost:3000/api pointing to your server
{{TokenFromAdmin}} is the Bearer token obtained from the first request to signin route.
Should be something like:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZjkzMGIwZC05M2QwLTQwZjctYTQ1NS1iYmFmOWZkNmE2YWYiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU1Mzc4NzY3LCJleHAiOjE3NTUzODIzNjd9.Vynr7XdKd__l8gj7TzCJvGZePKrhC-Ax8n2EfiSbl_g


