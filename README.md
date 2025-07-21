# ktmediaAssingment

This repository appears to be a full-stack job portal application built with Node.js, Express, Mongoose, and React. The application allows users to register, login, and logout, as well as create, update, and view job listings.

The backend is built with Node.js, Express, and Mongoose, and includes features such as authentication and authorization using JSON Web Tokens (JWT). The frontend is built with React and uses libraries such as React Router and Tailwind CSS.

The application has two main sections: a backend API built with Node.js and Express, and a frontend client built with React. The backend API handles user authentication, job listing creation and management, and other server-side logic. The frontend client provides a user interface for users to interact with the application.

The repository includes a number of features, including:

*   User registration and login functionality
*   Job listing creation, update, and deletion
*   Job listing search and filtering
*   User profile management

├── backend
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── Db
    │   │   └── db.js
    │   ├── app.js
    │   ├── constant.js
    │   ├── controllers
    │   │   ├── job.Controller.js
    │   │   └── user.Controller.js
    │   ├── index.js
    │   ├── middlewares
    │   │   ├── authenticateToken.middleware.js
    │   │   └── errorHandler.js
    │   ├── models
    │   │   ├── job.Model.js
    │   │   └── user.Model.js
    │   ├── routes
    │   │   ├── job.routes.js
    │   │   └── user.routes.js
    │   ├── utils
    │   │   ├── apiErrorHandler.js
    │   │   ├── generateAcessToken.js
    │   │   ├── generateRefreshToken.js
    │   │   ├── responseHandler.js
    │   │   └── wrapAsync.js
    │   └── validation
    │   │   ├── job.Validation.js
    │   │   └── user.Validation.js
    └── vercel.json
└── frontend
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
        └── vite.svg
    ├── src
        ├── App.css
        ├── App.jsx
        ├── assets
        │   ├── JobSeeker.jpg
        │   ├── add-job.png
        │   ├── asssingImg.png
        │   └── react.svg
        ├── components
        │   ├── Card.jsx
        │   ├── Joblist.jsx
        │   ├── Login
        │   │   └── Register
        │   │   │   └── SideImage.jsx
        │   └── Ui
        │   │   ├── Button.jsx
        │   │   ├── Input.jsx
        │   │   └── Searchable.jsx
        ├── context
        │   └── Authcontext.jsx
        ├── index.css
        ├── layout
        │   └── TopNavbar.jsx
        ├── main.jsx
        └── pages
        │   ├── AddJob.jsx
        │   ├── Home.jsx
        │   ├── JobDetails.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
    ├── vercel.json
    └── vite.config.js



    # 🧠 KT Media Assignment - Backend

This is the backend server for the KT Media Assignment project built using Node.js and Express. It connects to MongoDB and handles authentication using access and refresh tokens.

---

## 🚀 Getting Started

Follow the steps below to set up and run the backend server on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Vt221001/ktmediaAssingment.git
cd ktmediaAssingment/backend


2. Install Dependencies

npm install


Configure Environment Variables
Create a .env file in the /backend directory using the provided .env.example file:
cp .env.example .env

MONGO_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PORT=3000


4. Start the Server

npm run dev


🧰 Tech Stack
Node.js

Express.js

MongoDB (via Mongoose)

JWT for authentication

dotenv for environment management

📁 Environment Example
A sample environment configuration file is available at:

.env.example



