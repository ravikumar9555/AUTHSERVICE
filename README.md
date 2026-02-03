# AuthService

This is the Authentication Service for the Airline Booking System. It handles user registration, logging in, and token-based authentication/authorization using JWT (JSON Web Tokens).

## Features

-   **User Signup**: Create a new user account.
-   **User Signin**: Authenticate an existing user and receive a JWT.
-   **Authentication**: middleware to verify incoming JWTs.
-   **Authorization**: Check if a user has specific roles (e.g., Admin).

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MySQL
-   **ORM**: Sequelize
-   **Authentication**: JSON Web Tokens (JWT), Bcrypt

## Prerequisites

Ensure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/)
-   [MySQL](https://www.mysql.com/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd AuthService
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

1.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3001
    JWT_KEY=your_secret_key
    DB_SYNC=true  # Optional: Set to true to sync database models on start
    ```

2.  **Database Configuration:**
    The database configuration is located in `src/config/config.json`. By default, it uses `root` as the username and `rootroot` as the password. Update these credentials to match your local MySQL setup.

    ```json
    "development": {
      "username": "root",
      "password": "your_password",
      "database": "AUTH_DB_DEV",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
    ```

## Database Setup

1.  **Create the database:**
    Command line:
    ```bash
    mysql -u root -p
    CREATE DATABASE AUTH_DB_DEV;
    ```
    Or use the Sequelize CLI if configured.

2.  **Run Migrations:**
    ```bash
    npx sequelize db:migrate
    ```

## Running the Application

Start the development server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default is `3001`).

## API Endpoints

The base URL for all API endpoints is `http://localhost:<PORT>/api/v1`.

| Method | Endpoint | Description | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Create a new user account | `{ "email": "user@example.com", "password": "password123" }` |
| `POST` | `/signin` | Log in and get a token | `{ "email": "user@example.com", "password": "password123" }` |
| `GET` | `/isAuthenticated` | Verify if a token is valid | Headers: `x-access-token: <your_jwt_token>` |
| `GET` | `/isAdmin` | Check if the user is an admin | Headers: `x-access-token: <your_jwt_token>`, Body: `{ "id": <user_id> }` |
