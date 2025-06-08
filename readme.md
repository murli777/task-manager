# Task Manager API

A RESTful API for managing tasks with MongoDB as the database. This API provides endpoints for creating, reading, updating, and deleting tasks.

⚠️ **Warning: This is a demonstration project and should not be used in production environments.**
- No authentication/authorization implemented
- Basic error handling
- No rate limiting
- No security hardening
- No input validation middleware
- Minimal logging

## Base URL

```
http://localhost:3001/api/v1
```

## Endpoints

### Get All Tasks

Retrieve all tasks or filter tasks based on query parameters.

```http
GET /tasks
GET /tasks?name=task1&completed=true
```

Query Parameters:

- `name` (string): Filter tasks by name (case-insensitive)
- `completed` (boolean): Filter tasks by completion status
- `sort` (string): Sort tasks by fields (prefix with - for descending order)
- `fields` (string): Select specific fields to return

Example Response:

```json
{
  "success": true,
  "response": [
    {
      "_id": "123456789",
      "name": "Complete project",
      "completed": false
    }
  ]
}
```

### Get Single Task

Retrieve a specific task by its ID.

```http
GET /tasks/:id
```

Example Response:

```json
{
  "success": true,
  "response": {
    "_id": "123456789",
    "name": "Complete project",
    "completed": false
  }
}
```

### Create Task

Create a new task.

```http
POST /tasks
```

Request Body:

```json
{
  "name": "New task",
  "completed": false
}
```

Example Response:

```json
{
  "success": true,
  "response": {
    "insertedId": "123456789"
  }
}
```

### Update Task by ID

Update a specific task by its ID.

```http
PATCH /tasks/:id
```

Request Body:

```json
{
  "name": "Updated task name",
  "completed": true
}
```

Example Response:

```json
{
  "success": true,
  "response": {
    "_id": "123456789",
    "name": "Updated task name",
    "completed": true
  }
}
```

### Update Tasks by Query

Update multiple tasks that match a query.

```http
PUT /tasks/search
```

Request Body:

```json
{
  "query": {
    "completed": false
  },
  "data": {
    "completed": true
  }
}
```

Example Response:

```json
{
  "success": true,
  "response": {
    "_id": "123456789",
    "name": "Task name",
    "completed": true
  }
}
```

### Delete Task

Delete a specific task by its ID.

```http
DELETE /tasks/:id
```

Example Response:

```json
{
  "success": true,
  "response": {
    "message": "Task deleted successfully",
    "deletedTask": {
      "_id": "123456789",
      "name": "Task name",
      "completed": false
    }
  }
}
```

## Error Responses

The API returns appropriate HTTP status codes and error messages:

```json
{
  "success": false,
  "response": "Error message"
}
```

Common Error Status Codes:

- `400`: Bad Request - Invalid input
- `404`: Not Found - Resource not found
- `500`: Internal Server Error

## Query Features

### Sorting

Use the `sort` parameter to sort results. Prefix fields with `-` for descending order.

Example:

```http
GET /tasks?sort=name,-completed
```

### Field Selection

Use the `fields` parameter to select specific fields.

Example:

```http
GET /tasks?fields=name,completed
```

## Environment Variables

The API requires the following environment variables:

- `PORT`: Server port (default: 3001)
- `LOCAL_MONGO_CONNECTION_STRING`: MongoDB connection string

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a .env file with required environment variables
4. Start the server:

```bash
npm start
```
