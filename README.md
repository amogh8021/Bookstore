# 📚 Online Bookstore Project

A full-stack, premium e-commerce application for selling books. Built with a modern **React** frontend and a robust **Spring Boot** backend.

## 🚀 Tech Stack

### Frontend
*   **React** (Vite)
*   **Tailwind CSS** (Styling & Design System)
*   **Recharts** (Data Visualization)
*   **Axios** (API Integration)
*   **React Router DOM** (Navigation)

### Backend
*   **Java 23**
*   **Spring Boot 3**
*   **Spring Security** (JWT Authentication & OAuth2)
*   **Spring Data JPA** (Hibernate)
*   **MySQL** (Database)
*   **Lombok**

## ✨ Features

### 🛍️ User Features
*   **Browse & Search**: Dynamic book listings with search and category filters.
*   **User Accounts**: Secure Sign Up/Login with JWT and Google OAuth.
*   **Shopping Experience**: Add to Cart, Wishlist key items.
*   **Order Management**: Place orders and view order history.
*   **Support Pages**: Dedicated FAQ, Privacy Policy, and Shipping pages.

### 👑 Premium Admin Dashboard
*   **Visual Analytics**: Revenue charts, Order Status distribution (Pie Chart).
*   **Quick Stats**: Real-time overview of Total Revenue, Orders, Books, and Users.
*   **Management**:
    *   **Books**: Add, Edit, Delete, and set "Featured" books.
    *   **Users**: View and manage registered users.
    *   **Orders**: Track order status (New, Pending, Completed, Cancelled).

## 🛠️ Setup & Installation

### Prerequisites
*   Node.js & npm
*   Java JDK 17+ (JDK 23 recommended)
*   MySQL Server

### 1. Database Setup
Create a MySQL database named `bookstore_db` (or update `application.properties` with your credentials).

### 2. Backend Setup
```bash
cd Backend/BookStore-ba/BookStore
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Frontend Setup
```bash
cd BookStore-fr
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## 📂 Project Structure
*   `Backend/`: Spring Boot application source code.
*   `BookStore-fr/`: React frontend application source code.
*   `docker-compose.yml`: (Optional) Docker configuration for the database.

## 🛡️ API Endpoints (Key)
*   `POST /api/v1/auth/register` - Register new user
*   `POST /api/v1/auth/login` - Login
*   `GET /book/getAll` - Fetch all books
*   `GET /admin/stats` - dashboard statistics (Admin only)

---
Developed by [Amogh](https://github.com/amogh8021)
