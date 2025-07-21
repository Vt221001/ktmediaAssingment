# 💼 KT Media Assignment

This is a full-stack job portal application built with **Node.js**, **Express**, **MongoDB**, and **React**. The application allows users to register, login, and manage job listings, along with functionalities like job creation, search, filtering, and user profile management.

---

## 📁 Project Structure

```
ktmediaAssingment/
├── backend
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── src
│   │   ├── Db/db.js
│   │   ├── app.js
│   │   ├── constant.js
│   │   ├── controllers/
│   │   ├── index.js
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── validation/
│   └── vercel.json
└── frontend
    ├── .env
    ├── index.html
    ├── vite.config.js
    ├── src/
        ├── App.jsx
        ├── main.jsx
        ├── context/
        ├── components/
        ├── layout/
        └── pages/
```

---

## 🧠 Backend - KT Media Assignment

This is the backend server built with **Node.js**, **Express.js**, and **MongoDB**. It handles authentication using **JWT** and supports CRUD operations for job listings.

### 🚀 Getting Started

#### 1. Clone the Repository

```bash
git clone https://github.com/Vt221001/ktmediaAssingment.git
cd ktmediaAssingment/backend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `/backend` folder using the example:

```bash
cp .env.example .env
```

Update `.env` with your values:

```
MONGO_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PORT=3000
```

#### 4. Run the Server

```bash
npm run dev
```

---

## 🧰 Backend Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Access & Refresh Tokens)
- dotenv

---

## 🎨 Frontend - KT Media Assignment

The frontend is a responsive React application styled with Tailwind CSS. It interacts with the backend API for user and job management.

### 🧩 Features

- User Authentication (Login, Register)
- Job Listing (Add, Edit, Delete, View)
- Search and Filter Jobs
- Responsive UI
