# 📚 The Bookstore - Premium Full Stack E-Commerce

![Project Banner](https://via.placeholder.com/1200x400?text=The+Bookstore+Premium+E-Commerce)

> A production-ready, full-stack online bookstore application featuring a high-performance Spring Boot backend and a stunning, responsive React frontend. Designed with a focus on user experience, security, and administrative control.

<div align="center">

![Java](https://img.shields.io/badge/Java-23-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)
![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite)

</div>

## 🌟 Project Highlights

### 👑 Premium Admin Dashboard
The heart of the application is the **Advanced Admin Dashboard**, designed for total control and transparency.
*   **Visual Analytics**: Integrated **Recharts** to visualize Monthly Revenue (Line Charts) and Order Status Distribution (Pie Charts).
*   **Real-Time Statistics**: Instant aggregation of Total Orders, Revenue, Active Users, and Listed Books using optimized JPA queries.
*   **Smart Management**: 
    *   **Book Management**: Add, update, delete, and feature books with dynamic image handling.
    *   **User Oversight**: Monitor registered users and manage their roles.
    *   **Order Workflow**: Track orders through `NEW` -> `PENDING` -> `COMPLETED` stages.

### � Robust Security & Auth
*   **JWT Authentication**: Secure, stateless authentication with JSON Web Tokens.
*   **OAuth2 Integration**: Seamless **Google Login** for one-click user access.
*   **Role-Based Access Control (RBAC)**: Strict separation between `USER` and `ADMIN` routes to protect sensitive data.

### 🎨 Modern User Experience (UX)
*   **Skeleton Loaders**: "Premium" feel with shimmering loading states for books and tables (no jumping content!).
*   **Responsive Design**: Mobile-first architecture ensures a perfect experience on Phones, Tablets, and Desktops.
*   **Interactive UI**: automated Toast notifications, smooth transitions, and "Scroll-to-Top" navigation.

---

## 🏗️ Technical Architecture

### Frontend (User Interface)
*   **Framework**: React (Vite) for blazing fast performance.
*   **Styling**: Tailwind CSS for a custom, maintainable design system.
*   **Routing**: React Router DOM v6 for client-side routing.
*   **State Management**: React Hooks & Context API.
*   **HTTP Client**: Axios with interceptors for token management.

### Backend (Server)
*   **Framework**: Spring Boot 3 (Java 23).
*   **Database**: MySQL with Hibernate/JPA for ORM.
*   **Key Services**:
    *   `DashboardService`: Aggregates complex statistics efficiently.
    *   `OrderService`: Handles complex order lifecycles and transactional integrity.
    *   `AuthService`: Manages OTP, Password Hashing (BCrypt), and Token generation.

---

## � Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   **Java JDK 17+** (JDK 23 recommended)
*   **Node.js** (v18+)
*   **MySQL Server**

### 1. Clone the Repository
```bash
git clone https://github.com/amogh8021/Bookstore.git
cd Bookstore
```

### 2. Database Configuration
1.  Open MySQL Workbench or your CLI.
2.  Create a database:
    ```sql
    CREATE DATABASE bookstore_db;
    ```
3.  Update `Backend/BookStore-ba/BookStore/src/main/resources/application.properties` with your MySQL username and password.

### 3. Run the Backend
```bash
cd Backend/BookStore-ba/BookStore
./mvnw spring-boot:run
```
> The server will start on `http://localhost:8080`.

### 4. Run the Frontend
Open a new terminal:
```bash
cd BookStore-fr
npm install
npm run dev
```
> The application will open at `http://localhost:5173`.

---

## � Screenshots

| Admin Dashboard | Shop Page |
|:---:|:---:|
| *(Add Dashboard Screenshot)* | *(Add Shop Screenshot)* |

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## � License
This project is licensed under the MIT License.

---
**Developed by [Amogh](https://github.com/amogh8021)**
