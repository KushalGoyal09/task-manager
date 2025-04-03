# Task Management Application

This is a full-stack task management application built with a React-based frontend and an Express-based backend. The app allows users to register, log in, and manage their tasks efficiently.

---

## Features

- User authentication (register, login, logout)
- Task creation, editing, deletion, and status updates
- Task filtering and sorting
- Progress tracking and analytics
- Responsive design

---

## Local Setup Instructions

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/KushalGoyal09/task-manager/
   cd task-manager
   ```

2. Set up the backend:

   ```bash
   cd backend
   node install
   ```

3. Set up the database:

   - Create a PostgreSQL database.
   - Copy the `.env.example` file to `.env` and update the `DATABASE_URL` with your database connection string:
     ```
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<name>
     JWT_SECRET=<your-secret-key>
     PORT=3000
     ```

4. Apply Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Set up the frontend:
   ```bash
   cd ../client
   npm install
   ```

---

## How to Run the Application

### Backend

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Start the backend server:
   ```bash
   node run dev
   ```

The backend server will run on `http://localhost:3000`.

### Frontend

1. Navigate to the `client` folder:

   ```bash
   cd client
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`.

---

## API Endpoint Documentation

### Authentication

#### Register

- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "password": "Password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": null
  }
  ```

#### Login

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "password": "Password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": "<JWT_TOKEN>"
  }
  ```

#### Get Current User

- **Endpoint**: `GET /api/auth/me`
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User found",
    "data": {
      "id": "user-id",
      "username": "johndoe",
      "name": "John Doe"
    }
  }
  ```

---

### Tasks

#### Get All Tasks

- **Endpoint**: `GET /api/tasks`
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": [
      {
        "id": "task-id",
        "title": "Task Title",
        "description": "Task Description",
        "status": false,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Add Task

- **Endpoint**: `POST /api/tasks`
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task Description"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task added successfully",
    "data": {
      "id": "task-id",
      "title": "New Task",
      "description": "Task Description",
      "status": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

#### Edit Task

- **Endpoint**: `PUT /api/tasks/:id`
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Request Body**:
  ```json
  {
    "title": "Updated Task",
    "description": "Updated Description",
    "status": true
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "id": "task-id",
      "title": "Updated Task",
      "description": "Updated Description",
      "status": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

#### Delete Task

- **Endpoint**: `DELETE /api/tasks/:id`
- **Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": null
  }
  ```
