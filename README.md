# 🍽️ Restaurant Operations Dashboard

> **Enterprise-Grade Multi-Tenant RBAC SaaS** - A comprehensive platform for streamlined restaurant operations, financial tracking, and role-based analytics.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.6.2-CA4245?logo=react-router&logoColor=white&style=for-the-badge)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux&logoColor=white&style=for-the-badge)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.8-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?logo=axios&logoColor=white&style=for-the-badge)](https://axios-http.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.7.0-22B5BF?logo=REACT&logoColor=white&style=for-the-badge)](https://recharts.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-ffff00?logo=JSON%20web%20tokens&logoColor=white&style=for-the-badge)](https://jwt.io/)
[![GitHub](https://img.shields.io/badge/GitHub-Ready-2496ED?logo=github&logoColor=white&style=for-the-badge)](https://github.com/Anoop-Kumar-31/Role-Based-Analytics-Dashboard)
[![VERCEL](https://img.shields.io/badge/VERCEL-Deployed-2496ED?logo=vercel&logoColor=white&style=for-the-badge)](https://role-based-analytics-dashboard.vercel.app/)
---

## 🚀 Live Demo

Experience the dashboard instantly without manual configuration:
- **URL**: [Live Application Link](https://role-based-analytics-dashboard.vercel.app/) 
- **Demo Accounts**:
    - **Company Admin**: `demo_admin@dashboard.com` | `password123`
    - **Employee**: `demo_employee@dashboard.com` | `password123`

---

## 📖 Overview

The **Restaurant Operations Dashboard** is a sophisticated multi-tenant SaaS application designed to empower restaurant groups with data-driven insights. It bridges the gap between daily operations and high-level financial oversight, providing a unified platform for employees, managers, and executives.

Built with a focus on **scalability, security, and performance**, this dashboard showcases modern frontend architecture using React 19 and Vite, integrated with a robust role-based access control (RBAC) system.

> **Note:**
> This is a high-fidelity demonstration project. While the frontend and business logic are fully implemented, data persistence is handled via a service layer that can be connected to any compatible REST API.

---
## 📸 Visual Tour (Super Admin)


### Dashboard - Stats & Charts Overview Section
![Super Admin Dashboard](./screenshots/SA_dashboard.png)

### Expense Management Section
![Super Admin Expense Management](./screenshots/SA_expense.png)

### Onboarded Companies Section
![Super Admin Onboarded Companies](./screenshots/SA_onboarded.png)

### Onboarding Management Section
![Super Admin Onboarding Management](./screenshots/SA_onboarding.png)

### Revenue Management Section
![Super Admin Revenue Management](./screenshots/SA_revenue.png)

### User Management Section
![Super Admin User Management](./screenshots/SA_user.png)

---

## ✨ Key Features

### 🔐 Multi-Tenant RBAC System
The application features three specialized portals, each tailored to specific operational needs:
- **👑 Super Admin**: Global oversight, company onboarding, and cross-tenant user management.
- **🏢 Restaurant Admin**: Multi-unit management, staff oversight, and deep financial P&L analysis.
- **🧑‍🍳 Restaurant Employee**: Daily operations, real-time expense reporting, and revenue entry.

### 📈 Financial Intelligence
- **COGS Tracking**: Advanced invoice management system with smart categorization.
- **Revenue Analytics**: Real-time sales tracking and performance trends.
- **BlueBook (P&L)**: Industry-standard operational logging for comprehensive P&L reporting.
- **Risk Assessment**: Anomaly detection and expense-to-revenue ratio monitoring.

### 🌐 Scalable Infrastructure
- **Containerized Workflows**: Fully Docker-ready with multi-stage builds and Nginx orchestration.
- **Automatic SSL**: Integrated HTTPS support with automated certificate handling.
- **Modular Services**: Decoupled API layer for easy integration with backend systems.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19.1.0, React Router 7.6.2, Vite 6.3.5 |
| **State Management** | Redux Toolkit, Redux Persist |
| **Styling** | TailwindCSS 4.1.8, Lucide React, React Icons |
| **Networking** | Axios (with Interceptors), JWT-Based Auth |
| **Data Visualization** | Recharts 3.7.0 |
| **Infrastructure** | Docker, Docker Compose (Optional)|

---

## 📂 Project Architecture

```bash
restaurant-ops-dashboard/
├── public/                # Static assets & Manifest
├── src/
│   ├── components/        # UI System (Table, Popup, Sidebar, etc.)
│   ├── layouts/           # Structure wrappers for different portals
│   ├── pages/             # Feature views (Super Admin, Admin, Employee)
│   ├── services/          # API & Business Logic layer
│   │   ├── modules/       # Domain-specific services (Expense, Revenue)
│   │   └── apiClient.js   # Centralized Axios configuration
│   ├── store/             # Global State (Auth, Preferences)
│   └── index.jsx          # App Entry Point
├── nginx/                 # Web server configuration (Optional)
├── docker-compose.yml     # Orchestration (Optional)
└── dockerfile             # Multi-stage production build (Optional)
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** 18.x or later
- **npm** 9.x or later
- **Docker** (Optional, for containerized deployment)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Anoop-Kumar-31/Role-Based-Analytics-Dashboard.git

# Navigate to project
cd Role-Based-Analytics-Dashboard

# Install dependencies
npm install
```

### 3. Running Locally
```bash
# Start development server
npm run start
```
The app will be available at `http://localhost:3000`.

### 4. Production Build (Docker) (Optional)
```bash
# Spin up production-ready environment
docker compose up --build
```
Access the dashboard securely at `https://localhost`.

---

## 🎨 Professional Standard

> **Note: Enterprise React Patterns**
> 
* **Atomic Design**: Highly reusable, tested UI components.
* **Service Abstraction**: Logic-free components via specialized service modules.
* **Token Management**: Secure, persistent JWT handling with automatic expiration logic.
* **Mobile-First**: Fully responsive layouts using Tailwind's layout engine.

---

## 👨‍💻 Author - **Anoop Kumar**
- **GitHub**: [@Anoop-Kumar-31](https://github.com/Anoop-Kumar-31)
- **Portfolio**: [Anoop Kumar Portfolio](https://myportfolio-kto7.onrender.com/)

---
*Created for portfolio demonstration purposes.*