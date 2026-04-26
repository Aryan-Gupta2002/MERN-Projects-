# 📚 Course Selling Backend API

A Node.js + Express backend for a course selling platform with authentication, admin course management, and user purchases.

---

## 🚀 Features

* 🔐 User & Admin Authentication (JWT-based)
* 🧾 Input validation using Zod
* 🔑 Password hashing using Bcrypt
* 📦 MongoDB database integration (Mongoose)
* 👨‍🏫 Admin can:

  * Create courses
  * Update courses
  * View all created courses
* 👤 Users can:

  * Signup / Signin
  * View purchased courses

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Zod (Validation)
* JWT (Authentication)
* Bcrypt (Password hashing)

---

## 📁 Project Structure

```
.
├── routes/
│   ├── admin.js
│   ├── user.js
├── middleware/
│   ├── admin.js
├── db.js
├── index.js
├── .env
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
MONGODB_URI=your_mongodb_connection
JWT_USER_SECRET=your_user_secret
JWT_ADMIN_SECRET=your_admin_secret
```

---

## 📌 API Endpoints

### 👤 User Routes

**Signup**

```
POST /api/v1/user/signup
```

**Signin**

```
POST /api/v1/user/signin
```

**Get Purchases**

```
GET /api/v1/user/purchases
```

---

### 👨‍🏫 Admin Routes

**Signup**

```
POST /api/v1/admin/course/signup
```

**Signin**

```
POST /api/v1/admin/course/signin
```

**Create Course (Auth Required)**

```
POST /api/v1/admin/course
```

**Update Course (Auth Required)**

```
PUT /api/v1/admin/course
```

**Get All Courses (Auth Required)**

```
GET /api/v1/admin/course/bulk
```

---

## 🔐 Authentication

Use JWT token in headers:

```
Authorization: Bearer <token>
```

---

## ▶️ How to Run

Install dependencies:

```
npm install
```

Start server:

```
npm start
```

Or with nodemon:

```
npx nodemon index.js
```

---

## ⚠️ Notes

* Passwords are hashed before storing
* Duplicate users handled using try-catch
* Admin routes are protected using middleware
* MongoDB ObjectId used for filtering courses

---

## 📌 Future Improvements

* Add course purchase functionality
* Payment integration (Stripe/Razorpay)
* Role-based access control
* Pagination & filtering
* Frontend integration
