# 🛡️ Wellness Sessions API (Backend)

This is the backend service for the Wellness Sessions app, built using **Node.js**, **Express.js**, and **MongoDB**. It supports user authentication, session management, and auto-saving features.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Nidhi-Sharma-1612/wellness_session_backend.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Duplicate `.env.example` and rename it to `.env`. Add your environment variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```bash
npm run dev
```

Server will run at `http://localhost:5000`.

---

## 🔐 Authentication Endpoints

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | /api/register | Register new user     |
| POST   | /api/login    | Login and receive JWT |

---

## 📚 Session Management API

| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| GET    | /api/sessions               | Get public published sessions           |
| GET    | /api/my-sessions            | Get user’s own sessions (auth required) |
| GET    | /api/my-sessions/:id        | Get specific session by ID (auth)       |
| POST   | /api/my-sessions/save-draft | Save or update a draft session          |
| POST   | /api/my-sessions/publish    | Publish a saved session (auth)          |

> All `/my-sessions/*` routes are protected and require a valid JWT token.

---

## 🌐 Live Demo (Optional)

- [Frontend Demo (Vercel)](https://wellness-session-frontend.vercel.app/)
- [Backend API (Render)](https://wellness-session-backend-m43m.onrender.com)

---

## 🧠 Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- JWT Auth (jsonwebtoken + bcrypt)
