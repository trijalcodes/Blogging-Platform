# 📘 Blogging Platform – Full-Stack MERN Project  
A modern, fully responsive, dark-themed blogging platform built with the **MERN stack** featuring smooth animations, JWT-based authentication, full CRUD for posts & comments, and a clean glassmorphism UI.

---

## 🚀 Features

### 🔒 Authentication
- User registration & login  
- Secure JWT-based authentication  
- Protected routes for creating/editing posts  
- Logout with smooth exit animation  

### 📝 Blogging Features
- Create, edit, delete posts  
- Add, delete comments  
- Auto-refresh UI on actions  
- Author-only controls for edit/delete  

### 🎨 UI / UX
- Dark glassmorphism theme  
- Smooth page transitions (Framer Motion)  
- Login/logout animations  
- Responsive navbar with mobile menu  
- Custom pagination  
- Smooth scrolling enabled  

### 🔍 Search & Pagination
- Search posts by title/content  
- Server-side pagination  
- Fast API responses  

---

## 🏗 Tech Stack

### **Frontend**
- React  
- Vite  
- TailwindCSS  
- Framer Motion  
- Axios  
- React Router  
- Custom Pagination Component  

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcrypt for password hashing  

---

## 📦 Project Structure

```
project/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── api/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── tailwind.config.cjs
```

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies
```bash
cd backend
npm install
```

### 2️⃣ Create a `.env` file
```
MONGO_URI=mongodb://localhost:27017/blogging
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3️⃣ Start the server
```bash
npm run dev
```

Server runs at:  
👉 **http://localhost:5000**

---

## 🌐 Backend API Summary

### **Auth Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login & get JWT |

### **Post Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List posts (search + pagination) |
| POST | `/api/posts` | Create post (auth) |
| GET | `/api/posts/:id` | Get post details |
| PUT | `/api/posts/:id` | Edit post (author only) |
| DELETE | `/api/posts/:id` | Delete post + comments (author only) |

### **Comment Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments/:postId` | List comments |
| POST | `/api/comments/:postId` | Add comment (auth) |
| DELETE | `/api/comments/:id` | Delete comment (author only) |

---

## 💻 Frontend Setup

### 1️⃣ Install dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Start dev server
```bash
npm run dev
```

Frontend runs at:  
👉 **http://localhost:5173**

---

## 🛠 Environment Variables (Frontend)
Optional:

`frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## ✨ Animations Included
- Page transitions (Framer Motion)  
- Login success exit animation  
- Logout exit animation  
- Home fade-in animation  

---

## 👨‍💻 Author
**Developed by Trijal Shukla**

GitHub: https://github.com/your-profile  
LinkedIn: https://linkedin.com/in/your-profile  
Instagram: https://instagram.com/your-profile  
