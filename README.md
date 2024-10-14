# To-Do API

This is a simple To-Do list API built using Node.js, Express, and MongoDB.

## Features

- Create, view, update, and delete to-do items.
- View all to-do items or a single to-do item.
- Remove all to-do items from the database.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - version 12 or later
- [MongoDB](https://www.mongodb.com/) - version 4 or later

## Getting Started



```bash
cd todo-api
2. Install dependencies
Run the following command to install the required dependencies:
node app.js

bash
Copy code
npm install
3. Start MongoDB
Ensure MongoDB is running on your machine. By default, the API connects to a MongoDB instance at mongodb://localhost:27017 and uses a database called todo.

bash
Copy code
mongod
4. Start the server
Run the following command to start the server:

bash
Copy code
npm start
The server will run on http://localhost:3003.

API Endpoints
Base URL
arduino
Copy code
http://localhost:3003
1. Create a To-Do
bash
Copy code
POST /
Body Parameters and select raw:
choose JSON


title (string) - Title of the to-do.
description (string) - Description of the to-do.
createdBy (string) - The creator of the to-do.
Example Request:

json
Copy code
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Cheese",
  "createdBy": "John Doe"
}
Response:

201: To-Do has been created.
500: Internal server error.
2. View All To-Dos
bash
Copy code
GET /todos/
Response:

200: Returns a list of all to-dos.
500: Internal server error.
3. View a Single To-Do
bash
Copy code
GET /todos/:todo_id
URL Parameters:

todo_id (string) - The ID of the to-do.
Response:

200: Returns the requested to-do.
404: To-Do not found.
500: Internal server error.
4. Update a To-Do
bash
Copy code
PATCH /todos/:todo_id
URL Parameters:

todo_id (string) - The ID of the to-do.
Body Parameters:

title (string) - Title of the to-do (optional).
description (string) - Description of the to-do (optional).
createdBy (string) - The creator of the to-do (optional).
Response:

200: To-Do updated successfully.
404: To-Do not found.
500: Internal server error.
5. Delete a Single To-Do
bash
Copy code
DELETE /todos/:todo_id
URL Parameters:

todo_id (string) - The ID of the to-do.
Response:

200: To-Do has been deleted.
404: To-Do not found.
500: Internal server error.
6. Delete All To-Dos
bash
Copy code
DELETE /todos/
Response:

200: All To-Dos have been deleted.
500: Internal server error.
Error Handling
The API returns appropriate HTTP status codes and error messages based on the outcome of the request. For example:

404 Not Found: If a to-do item with the given ID does not exist.
500 Internal Server Error: If there is a problem with the server or the database.
Running the Project in Development
To run the project with live reloading during development, use:

bash
Copy code
npm run dev
This will start the server using nodemon to automatically restart it on code changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

javascript
Copy code

This `README.md` provides an overview of the project, setup instructions, and documentation for the available API endpoints. Be sure to replace `yourusername` in the clone command with your actual GitHub username if you plan to host the project publicly.