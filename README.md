# MERN Todo App with Authentication

A full-stack MERN (MongoDB, Express, React, Node.js) Todo application with secure authentication and task management features.

---

## 🚀 Live Demo

- Frontend: https://mern-todo-app-frontend-tau.vercel.app
- Backend: https://mern-todo-app-backend.onrender.com

---

## 📂 Project Structure

MERN_Todo_App/
├── backend/
├── frontend/
├── README.md ✅ (Main project documentation)

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes using middleware

### 📝 Task Management

- Create Task
- View Tasks (User-specific)
- Update Task (Title, Description, Status)
- Delete Task

### ⚙️ Additional Features

- Axios interceptor for automatic token handling
- Responsive UI using React Bootstrap
- Clean and modular folder structure
- Error handling and validation

---

## 🛠 Tech Stack

### Frontend:

- React (Vite)
- Redux Toolkit
- React Bootstrap
- Axios

### Backend:

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Deployment:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📌 API Endpoints

### Auth APIs

- POST `/auth/register` → Register new user
- POST `/auth/login` → Authenticate user and return JWT

### Task APIs (Protected)

- GET `/tasks` → Get tasks of logged-in user
- POST `/tasks` → Create task
- PUT `/tasks/:id` → Update task
- DELETE `/tasks/:id` → Delete task

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/github12subir/MERN_Todo_App.git

cd MERN_Todo_App

2️⃣ Backend Setup

cd backend
npm install

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run backend:

npm run dev

3️⃣ Frontend Setup

cd frontend
npm install

Create a .env file inside the frontend folder:

# Local Development
# VITE_API_URL=http://localhost:5000

# Production Backend
VITE_API_URL=https://mern-todo-app-backend-8m4i.onrender.com

Run frontend:

npm run dev


🔐 Authentication Flow

User registers or logs in
Backend returns a JWT token
Token is stored in localStorage
Axios interceptor attaches token to requests
Protected APIs are accessed securely

📄 Environment Variables
Backend (backend/.env.example)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

Frontend (frontend/.env.example)

# Local Development
# VITE_API_URL=http://localhost:5000

# Production Backend
VITE_API_URL=https://mern-todo-app-backend-8m4i.onrender.com


📌 Expected Skills Demonstrated

Clean API structure
Secure authentication implementation
Modular frontend components
Proper state management (Redux Toolkit)
Error handling
Clean folder structure

👨‍💻 Author

Subir Mondal
```
