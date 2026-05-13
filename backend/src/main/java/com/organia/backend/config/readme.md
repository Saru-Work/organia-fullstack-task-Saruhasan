# Task Management App

## Project Overview

Organia is a fullstack task management application that allows users to manage their daily tasks.

Features include:

- User Authentication (Register/Login)
- Create Tasks
- Update Tasks
- Delete Tasks
- Search Tasks
- Filter Tasks
- Add Notes
- Responsive Design
- JWT Protected Routes

The project is built using Next.js on the frontend and Spring Boot on the backend.

---

# Technology Stack Used

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit

## Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- PostgreSQL

## Deployment
- Frontend: Vercel
- Backend: Railway
- Database: Supabase PostgreSQL

---

# Setup and Instructions

## Frontend Setup and Instructions
- Clone the Repository (git clone https://github.com/Saru-Work/organia-fullstack-task-Saruhasan.git)
- Cd frontend
- Install Dependencies for the frontend (cd frontend npm install)
- Create .env.local and add (NEXT_PUBLIC_API_URL=https://localhost:8080/)
- Run frontend with (npm run dev) frontend will run on post 3000

## Backend Setup and Instructions
- Cd backend
- Add data to application.properties like
  - server.port=8080
  - spring.datasource.url=YOUR_DATABASE_URL
  - spring.datasource.username=YOUR_DATABASE_USERNAME
  - spring.datasource.password=YOUR_DATABASE_PASSWORD
  - spring.datasource.driver-class-name=org.postgresql.Driver
  - spring.jpa.hibernate.ddl-auto=update
  - spring.jpa.show-sql=true
  - jwt.secret=YOUR_SECRET_KEY
- Run using IntellijIDEA

## Live URLS
- frontend(https://organia-fullstack-task-saruhasan.vercel.app/)
- backend(https://organia-fullstack-task-saruhasan-production.up.railway.app)

# API Documentation

## APIs
- Auth APIs
  - login (post): /auth/login
  - register(post): /auth/register
  - current user(get): /auth/getMe 
- Task APIs
  - all tasks(get): /tasks/
  - create task(post): /tasks/
  - delete task(delete): /tasks/delete/id
  - update task(put): tasks/update/id
  - update status(patch): tasks/id/status
  - add note(patch): tasks/id/notes
  

## Base URL
```bash
https://organia-fullstack-task-saruhasan-production.up.railway.app
```

---

# Authentication APIs

## Register User
- Endpoint - `POST /auth/register`
- Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
  "name": "Saruhasan",
  "email": "saru@gmail.com",
  "password": "Saru2001@"
}
```

### Response Body
```json
{
  "id": 1,
  "name": "Saruhasan",
  "email": "saru@gmail.com",
  "tasks": []
}
```

---

## Login User
- Endpoint - `POST /auth/login`
- Headers
```http
Content-Type: application/json
```

### Request Body
```json
{
  "email": "saru@gmail.com",
  "password": "Saru2001@"
}
```

### Response Body
```json
{
  "token": "jwt-token"
}
```

---

## Get Current User
- Endpoint - `GET /auth/getMe`
- Headers
```http
Authorization: Bearer <token>
```

### Response Body
```json
{
  "id": 1,
  "name": "saruhasan",
  "email": "saru@gmail.com",
  "tasks": [
    {
      "id": 1,
      "title": "Finish project",
      "description": "Complete backend integration",
      "category": "Work",
      "dueDate": "2026-05-20",
      "status": false
    }
  ]
}
```

---

# Task APIs

## Create Task
- Endpoint - `POST /tasks/create`
- Headers
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Request Body
```json
{
  "title": "Task1",
  "description": "Desc1",
  "category": "Work",
  "dueDate": "2026-05-20",
  "status":"IN_PROGRESS"
}
```

### Response Body
```json
{
  "id": 1,
  "title": "Task2",
  "description": "Desc2",
  "category": "Work",
  "dueDate": "2026-05-20",
  "status": "IN_PROGRESS"
}
```

---

## Get All Tasks
- Endpoint - `GET /tasks`
- Headers
```http
Authorization: Bearer <token>
```

### Response Body
```json
[
  {
    "id": 1,
    "title": "Task1",
    "description": "Desc",
    "category": "Work",
    "notes":"",
    "dueDate": "2026-05-20",
    "status": "IN_PROGRESS"
  },
  {
    "id": 2,
    "title": "Task2",
    "description": "Desc",
    "category": "Personal",
    "notes":"",
    "dueDate": "2026-05-18",
    "status": "COMPLETED"
  }
]
```

---

## Get Single Task
- Endpoint - `GET /tasks/{id}`
- Headers
```http
Authorization: Bearer <token>
```

### Response Body
```json
{
  "id": 1,
  "title": "Finish project",
  "description": "Complete the backend integration",
  "category": "Work",
  "notes:"",
  "dueDate": "2026-05-20",
  "status": "TO_DO"
}
```

---

## Update Task
- Endpoint - `PUT /tasks/update/{id}`
- Headers
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Request Body
```json
{
  "title": "Task1",
  "description": "Desc1",
  "category": "Work",
  "notes":"",
  "dueDate": "2026-05-25",
  "status": "completed"
}
```

### Response Body
```json
{
  "id": 1,
  "title": "Task2",
  "description": "Complete frontend and backend",
  "category": "Work",
  "note":"",
  "dueDate": "2026-05-25",
  "status": "COMPLETED"
}
```

---

## Delete Task
- Endpoint - `DELETE /tasks/delete/{id}`
- Headers
```http
Authorization: Bearer <token>
```


## Demo Credentials
- email: saru@gmail.com
- password: Saru2001@
