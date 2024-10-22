# Blog Website Backend - NestJS

## Introduction
This project is the backend API for a blog website, built using NestJS and Prisma with PostgreSQL as the database.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14+)
- [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Project Setup

### 1. Clone the repository

First, clone the project from the repository to your local machine:

```bash
git clone <repository-url>
cd <project-folder>
yarn install
```

### 2. Create the `.env` file

In the root directory of the project, create a `.env` file to configure your environment variables. The content of the `.env` file should look like this:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=blogWeb"

ACCESS_TOKEN_SECRET_EXPIRE=10800          # 3 hours for access token to expire
REFRESH_TOKEN_SECRET_EXPIRE=2592000       # Refresh token expiry
JWT_EXPIRES_IN=365d                       # JWT expiration set to 365 days
```

Ensure that the `DATABASE_URL` matches your local PostgreSQL configuration.

### 3. Set up the Database

After configuring the `.env` file, run the following command to initialize the database using Prisma migrations:

```bash
npx prisma migrate dev --name init
```

This command will apply the database migrations based on the Prisma schema.

### 4. Run the Project in Development Mode

Start the application in development mode using:

```bash
yarn run start:dev
```

This will start your NestJS application, and you should see the following message:

```
Server is running on port 4040...
```

### 5. Access the API

Once the server is running, you can visit the API locally in your browser or API client at:

```
http://localhost:4040/api
```

## Additional Information

- **Access Token Expiry**: 3 hours (`ACCESS_TOKEN_SECRET_EXPIRE`)
- **Refresh Token Expiry**: 30 days (`REFRESH_TOKEN_SECRET_EXPIRE`)
- **JWT Expiration**: 1 year (`JWT_EXPIRES_IN`)

---

## Useful Commands

- **Install dependencies**: 
  ```bash
  yarn install
  ```

- **Run the project**: 
  ```bash
  yarn run start:dev
  ```

- **Apply database migrations**: 
  ```bash
  npx prisma migrate dev --name init
  ```

- **Generate Prisma client**: 
  ```bash
  npx prisma generate
  ```

---

## Troubleshooting

- If your database connection fails, ensure your PostgreSQL service is running and your credentials in the `.env` file are correct.
- If Prisma migration errors occur, try resetting the database by running:

  ```bash
  npx prisma migrate reset
  ```
