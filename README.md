# 🚀 Project Setup & Developer Guide

This documentation serves as the central guide for anyone working on this project.

---

## 📦 Requirements: Things to Install

Make sure the following tools are installed on your machine:

- ✅ **Laragon** *(for terminal only)*
- ✅ **NVM** *(for Node.js — or use Laragon instead)*
  - Node.js version: `v22.15.0`
- ✅ **Docker**
- ✅ **PostgreSQL**
- ✅ **Postman** *(for API testing)*

---

## 🔧 Things to Run

You will need to run the following services to get the project up and running:

- Frontend
- Backend
- Docker
- PostgreSQL Database

---

## 🌐 Running the Frontend

> ⚠️ Requires the latest version of Node.js

```bash
npm install
npm run dev
```

---

## 🧠 Running the Backend

```bash
npm install
npm run prisma:generate
npm run migrate:dev
npm run seed:run
npm run dev
```

---

## 🐳 Running Docker

```bash
docker compose up
```

---

## 🗃 Running the Database Locally

> Set up and run PostgreSQL on your local machine manually if you're not using Docker.

---

## 📦 Run Everything in Docker

1. Switch to the `feat-docker` branch:
    ```bash
    git checkout feat-docker
    ```

2. Start all services:
    ```bash
    docker-compose up --build
    ```

---

## 🔍 Prisma Studio

To visually explore your database using Prisma:

```bash
npx prisma studio
```

---

## 📮 API Authentication (Postman)

> Desktop version of Postman is required.

### Login Endpoint

- **Method:** `POST`  
- **URL:** `http://localhost:4000/api/v1/auth/login`  
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "identifier": "abir@manush.tech",
    "password": "123456"
  }
  ```

---

## 🗂 Project Structure

### Backend

```
backend/
├── src/
│   ├── app.module.ts
│   ├── product/
│   │   ├── dto/
│   │   │   └── create-product.dto.ts
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   └── product.module.ts
│   └── prisma/
│       └── prisma.service.ts
├── prisma/
│   └── schema.prisma
└── main.ts
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx
│   │   └── ProductForm.jsx
│   ├── pages/
│   │   └── ProductManagement.jsx
│   ├── services/
│   │   └── productService.js
│   ├── App.jsx
│   └── main.jsx
```

---

## 🧪 Testing APIs in Postman

### 📦 Testing Products

**Create Product**

- **POST** `http://localhost:4000/api/v1/promotion`  
- **Body (JSON):**
  ```json
  {
    "name": "Sample Product",
    "description": "This is a test product.",
    "price": 99.99,
    "weight": 1.5
  }
  ```

**Get All Products**

- **GET** `http://localhost:4000/products`

---

### 📦 Testing Orders

**Create Order**

- **POST** `http://localhost:4000/api/v1/order`  
- **Body (JSON):**
  ```json
  {
    "customerName": "Alice",
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ]
  }
  ```

---

## ⚠️ Known Issues

- Prisma does **not** work well with MySQL in this boilerplate.
- PostgreSQL authentication may fail both in Docker and local setups.
- Redis has dependencies on both and fails if either PostgreSQL or Prisma fails.
- Vite server:
  - **Very slow** when reloading.
  - **Fails to start** if VSCode is running.

---

Happy coding! 🧑‍💻
