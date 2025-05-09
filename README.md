# Ticket Backend

This is a backend application for managing user accounts, tickets, and authentication using Node.js, Express, MongoDB, and Redis.

## Features

- User registration and login
- JWT-based authentication (Access and Refresh tokens)
- Password reset functionality
- Ticket creation, retrieval, update, and deletion
- Middleware for validation and authorization
- Email notifications for password reset and updates
- Redis integration for token management


## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ticket-backend
   
2. Install dependencies:
   ```bash
   npm install

3. Start the Application
   ```bash
   npm start

The API will be available at http://localhost:2001

## API Endpoints

### User Endpoints

- **POST** `/user` - Sign up
- **POST** `/user/login` - Login
- **GET** `/user` - Get user profile
- **POST** `/user/reset-password` - Request password reset
- **PATCH** `/user/reset-password` - Update password

### Ticket Endpoints

- **POST** `/ticket` - Create a ticket
- **GET** `/ticket` - Get all tickets
- **GET** `/ticket/:_id` - Get a ticket by ID
- **PUT** `/ticket/:_id` - Update ticket reply
- **PATCH** `/ticket/close-ticket/:_id` - Close a ticket
- **DELETE** `/ticket/:_id` - Delete a ticket

### Token Endpoints

- **POST** `/tokens` - Generate new access tokens


## Testing

You can use the `rest.http` file to test the API endpoints using tools like [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in Visual Studio Code.

## Dependencies

- **bcrypt**: For password hashing
- **body-parser**: For parsing request bodies
- **cors**: For enabling CORS
- **dotenv**: For environment variable management
- **express**: Web framework
- **helmet**: For securing HTTP headers
- **joi**: For request validation
- **jsonwebtoken**: For JWT-based authentication
- **mongoose**: For MongoDB object modeling
- **morgan**: For HTTP request logging
- **nodemailer**: For sending emails
- **redis**: For token storage
