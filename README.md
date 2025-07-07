# 🚀 SmartTrack - A Smarter Todo Manager

![Banner](https://img.shields.io/badge/Vite-Frontend-blueviolet?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styles-blue?style=flat&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-green?style=flat&logo=vercel)
![MongoDB](https://img.shields.io/badge/Backend-MongoDB-darkgreen?style=flat&logo=mongodb)
![Serverless](https://img.shields.io/badge/API-Vercel%20Serverless-black?style=flat&logo=vercel)

**SmartTrack** is a full-stack task management web application built using React, Vite, Tailwind CSS, MongoDB, and Vercel Serverless Functions. It allows users to add, update, complete, and manage tasks in real-time, categorized into **Ongoing**, **Success**, and **History** based on deadline and completion status.

---

## 🔗 Live Demo

👉 [View Deployed App on Vercel](https://smart-todo-app-fullstack.vercel.app/)

## 📂 GitHub Repo

👉 [smart-todo-app GitHub Repository](https://github.com/GuptaKashish105/smart-todo-app)

---

## 📸 Screenshots

### 🏠 Home Page
<img src="./src/assets/home page.png" alt="Home Page" width="700"/>

### 🔍 Search Filter 
<img src="./src/assets/search filter.png" alt="Create Task" width="700"/>

---

## 📌 Features

- 🧠 Create, edit, and delete tasks with title, description, and deadline
- ⏱️ Smart bucketing: auto-grouping based on deadline + completion
- ✅ Mark tasks as complete or move to history
- 🔍 Live search filter
- ⚡ Smooth transitions with `@tailwindcss/animate`
- 💾 Persistent storage with MongoDB Atlas
- 🔌 Full-stack implementation with Vercel Serverless backend
- 📁 Resume download + GitHub/LinkedIn integration

---

## ⚙️ Tech Stack & Tools

| Layer         | Technology                        |
|---------------|------------------------------------|
| Frontend      | React + Vite                       |
| Styling       | Tailwind CSS + `@tailwindcss/animate` |
| Icons         | react-icons                        |
| Backend/API   | Vercel Serverless Functions (`/api/tasks.js`) |
| Database      | MongoDB Atlas                      |
| Deployment    | Vercel (Frontend + API together)   |

---

## 🔧 Backend API (MongoDB)

All tasks are stored in a **MongoDB Atlas** database and accessed using **Vercel Serverless Functions**.

### 🔌 Endpoints:

| Method | Endpoint       | Description                   |
|--------|----------------|-------------------------------|
| GET    | `/api/tasks`   | Fetch all tasks               |
| POST   | `/api/tasks`   | Create a new task             |
| PUT    | `/api/tasks/:id` | Update a task (title, status, etc.) |
| DELETE | `/api/tasks/:id` | Delete a task                |

> ✅ Status (`ongoing`, `success`, `failure`) is derived in the frontend using `isCompleted` and `deadline`.

---

## 🛠️ Local Setup Instructions

> Make sure you have **Node.js (v16+)** and a MongoDB Atlas URI.

```bash
# 1. Clone the repo
git clone https://github.com/GuptaKashish105/smart-todo-app.git
cd smart-todo-app

# 2. Install dependencies
npm install

# 3. Create environment variable
touch .env.local
# Add your MongoDB URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority

# 4. Run the app locally (Vite + Serverless API)
vercel dev
