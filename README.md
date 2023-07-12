# Guestbook API

The Guestbook API is a simple API built using Node.js, Express, Validator, Bcrypt, and JWT. It allows users to sign the guestbook by adding their names and comments. This README provides an overview of the API and instructions for running and using it.

## Features

- User registration and authentication using JWT (JSON Web Tokens).
- Secure password hashing with Bcrypt for user data protection.
- Validation of request inputs using Express Validator for data integrity.
- CRUD operations for managing guestbook entries (Create, Read, Update, Delete).

## Setup and Installation

1. Clone the repository: `git clone https://github.com/your-username/guestbook-api.git`
2. Navigate to the project directory: `cd guestbook-api`
3. Install dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     - `JWT_SECRET`: Secret key for JWT token signing.
     - `DATABASE_URL`: URL for the MongoDB database.
5. Start the server: `npm start`

## API Endpoints

The following API endpoints are available:

- `POST /api/v1/user`: Register a new user.
- `POST /api/v1/user/login`: Authenticate user and generate JWT token.
- `GET /api/v1/messages`: Get all guestbook entries.
- `GET /api/v1/messages/:id`: Get a specific guestbook entry by ID.
- `POST /api/v1/messages`: Create a new guestbook entry.
- `PATCH /api/v1/messages/:id`: Update a guestbook entry by ID.
- `DELETE /api/v1/messages:id`: Delete a guestbook entry by ID.

For detailed request and response examples, please refer to the API documentation.

## Documentation

For detailed documentation of the API endpoints, request payloads, and responses, please refer to the [API Documentation](./docs/api-documentation.md) file.

## Contributing

Contributions to the Guestbook API are welcome. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

The Guestbook API is open-source and released under the [MIT License](./LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

---

Thank you for checking out the Guestbook API. We hope you find it useful and enjoy using it in your projects. If you have any questions, feel free to contact us.
