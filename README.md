# API Rate Limiting Service

## Description

This project is an API built with Express and Redis that implements rate limiting for public and private routes. Rate limiting is managed using Redis to store the request state and handle the rate limits in a distributed environment, allowing the solution to work correctly even with multiple server instances.

## Requirements

- Node.js (v16.x or higher)
- Redis
- Configured environment variables

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your_username/rate-limiter-redis.git
   cd outvio-test-backend
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Configure the environment variables:**

   Create a `.env` file in the root of the project with the following content:

   ```env
   NODE_PORT=3000
   API_SECRET=your_secret_key
   TOKEN_RATE_LIMIT=200
   TOKEN_LIMIT_DURATION=3600
   IP_RATE_LIMIT=100
   IP_LIMIT_DURATION=3600
   ```

   - `NODE_PORT`: Port where the server will run.
   - `API_SECRET`: Secret key for JWT verification.
   - `TOKEN_RATE_LIMIT`: Request limit per token.
   - `TOKEN_LIMIT_DURATION`: Duration in seconds for token rate limit.
   - `IP_RATE_LIMIT`: Request limit per IP.
   - `IP_LIMIT_DURATION`: Duration in seconds for IP rate limit.

   You will find an .env.example where you can extract the data and put it on the .env

4. **Start the server:**

   ```bash
   npm start
   ```

## Project Structure

- **`src/`**: Source directory of the project.
  - **`middlewares/`**: Contains custom middlewares for authentication and rate limiting.
    - `auth.ts`: Middleware for JWT-based authentication.
    - `publicRateLimiter.ts`: Middleware for rate limiting based on IP for public routes.
    - `privateRateLimiter.ts`: Middleware for rate limiting based on token for private routes.
  - **`routes/`**: Directory containing API routes.
    - **`public/`**: Public routes.
      - `PublicRoutes.ts`: Defines public routes with rate limiting.
    - **`private/`**: Private routes.
      - `PrivateRoutes.ts`: Defines private routes with authentication and rate limiting.
  - **`database/`**: Contains Redis configuration.
    - `RedisClient.ts`: Configures and exports the Redis client.
  - **`utilites/`**: Project utilities.
    - `errors.ts`: Custom error handling.
  - **`Server.ts`**: Server configuration and startup.

## Routes

- **Public** (`/public`): These routes are subject to IP-based rate limiting.

  - `GET /endpoint-1`
  - `GET /endpoint-2`
  - `GET /endpoint-3`

- **Private** (`/private`): These routes require JWT authentication and are subject to token-based rate limiting.
  - `GET /endpoint-1`
  - `GET /endpoint-2`
  - `GET /endpoint-3`

## Middlewares

- **`checkAuth`**: Authentication middleware that verifies the JWT token in requests to private routes.
- **`publicRatelimiter`**: Rate limiting middleware that controls requests to public routes based on IP.
- **`privateRateLimiter`**: Rate limiting middleware that controls requests to private routes based on token.

## Running in a Distributed Environment

The solution is designed to work correctly in a distributed environment with multiple server instances. It uses Redis as a centralized store to manage rate limits, allowing multiple server instances to share the same rate limiting state.
