# 🚀 SmartTrack - A Smarter Todo Manager

![Banner](https://img.shields.io/badge/Vite-Frontend-blueviolet?style=flat&logo=vite) ![Tailwind](https://img.shields.io/badge/TailwindCSS-Styles-blue?style=flat&logo=tailwindcss) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-green?style=flat&logo=vercel)

**SmartTrack** is a modern and intuitive task management web application built using React, Vite, and Tailwind CSS. It allows users to add, manage, and track tasks in real-time across different categories — **Ongoing**, **Success**, and **History** — based on completion status and deadlines.

## 🔗 Live Demo

👉 [View Deployed App on Vercel](https://smart-todo-app-zeta.vercel.app/)

## 📂 GitHub Repo

👉 [smart-todo-app GitHub Repository](https://github.com/GuptaKashish105/smart-todo-app)

---

## 📸 Screenshots

### 🏠 Home Page
<img src="./src/assets/home page.png" alt="Home Page" width="700"/>

### 🔍 Search Filter 
<img src="./src/assets/search filter.png" alt="Create Task" width="700"/>


## 📌 Features

- 🧠 Create, edit, and delete tasks with title, description, and deadline
- ⏱️ Smart bucketing: automatically groups tasks based on deadline and status
- ✅ Mark tasks as complete or move to history
- 🔍 Search bar with live filtering
- ⚡ Beautiful transitions with `@tailwindcss/animate`
- 🖼️ Clean and responsive UI with gradient backgrounds
- 💼 Resume download + GitHub/LinkedIn links included

---

## ⚙️ Tech Stack & Tools

| Purpose        | Tech Stack                         |
| -------------- | ---------------------------------- |
| Frontend       | React + Vite                       |
| Styling        | TailwindCSS, Animations            |
| Icons          | react-icons (Lucide, GitHub, etc.) |
| API Handling   | REST (mocked with `json-server`)   |
| Deployment     | Vercel                             |

---

## 🛠️ Backend (Mock API)

This project uses a local JSON server to simulate a real backend.

- Data is stored at: `http://localhost:3001/tasks`
- To run it locally:
  ```bash
  npm install -g json-server
  json-server --watch db.json --port 3001

---


## 🛠️ Local Setup Instructions

> Ensure you have **Node.js** installed (v16+)

```bash
# 1. Clone the repo
git clone https://github.com/GuptaKashish105/smart-todo-app.git
cd smart-todo-app

# 2. Install dependencies
npm install

# 3. Start the mock backend (json-server must be installed globally)
npx json-server --watch db.json --port 3001

# 4. Start the frontend
npm run dev
