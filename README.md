# 📚 Library Management System - Backend

This is the backend of the Library Management System (LMS) built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for user authentication, book management, borrowing functionality, reviews, and admin reports.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Joi for Validation
- Bcrypt for Password Encryption
- CORS & Morgan Middleware

---

## ⚙️ Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ishworj/LMS_server
   cd backend
   yarn
   yarn dev
   
## 🔐 Authentication & Authorization

- Uses **JWT-based token authentication** to securely manage user sessions.
- Implements **role-based access control** to distinguish between `admin` and `member` permissions.
- **Protected routes** are secured with authentication middleware to prevent unauthorized access.


## 🧑‍💻 Pages

- **`/login`** – Login form
- **`/register`** – User registration
- **`/books`** – List and browse available books
- **`/books/:id`** – View book details, user reviews, and borrow option
- **`/dashboard`** – Admin dashboard to manage users, books, borrowings, and reviews
- **`/profile`** – View user profile, borrowing history, and account settings
