# Restaurant Operations Dashboard

> **Portfolio Demo Project** - A comprehensive multi-tenant SaaS application for restaurant operations management

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite) ![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.8-38B2AC?logo=tailwind-css) ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

---

## 📋 Overview

This is a full-featured restaurant operations management system built to demonstrate modern web development practices and multi-tenant SaaS architecture. The application provides comprehensive tools for managing expenses, revenue tracking, and operational analytics across multiple restaurant locations.

**Note**: This is a portfolio/demonstration project showcasing technical implementation and architectural decisions. While fully functional, it uses simulated backend connections for demo purposes.

---

## ✨ Key Features

### 🏢 Multi-Tenant Architecture
- **Three distinct user portals** with role-based access control (RBAC)
  - **Super Admin**: Organization oversight, company onboarding, user management
  - **Restaurant Admin**: Multi-location management, team oversight, full operational control
  - **Restaurant Employee**: Day-to-day operations, expense/revenue reporting

### 💰 Financial Management
- **Expense Tracking**: Detailed COGS (Cost of Goods Sold) invoice management with category-based organization
- **Revenue Management**: Comprehensive revenue tracking and reporting by location
- **Blue Book**: Industry-standard P&L tracking and analysis

### 👥 User & Access Management
- JWT-based authentication with token expiration handling
- Role-based permissions and portal routing
- User creation and management across organizations

### 🏪 Multi-Location Support
- Restaurant onboarding workflow
- Location-specific data isolation
- Centralized management dashboard

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19.1.0 with Hooks and Functional Components
- **Build Tool**: Vite 6.3.5 (blazing fast HMR)
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM v7
- **Styling**: TailwindCSS 4.1.8 (utility-first CSS)
- **Icons**: Lucide React + React Icons
- **HTTP Client**: Axios with interceptors
- **UI Components**: Custom reusable component library
- **Notifications**: React Hot Toast

### DevOps & Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Web Server**: Nginx with HTTPS support
- **SSL**: Self-signed certificates (auto-generated)
- **Development**: Hot reload, ESLint integration

### Architecture Patterns
- **Component**: Atomic design with reusable components
- **State**: Centralized Redux store with slice pattern
- **API**: Service layer abstraction with endpoint management
- **Auth**: Token-based authentication with automatic refresh

---

## 📂 Project Structure

```
restaurant-ops-dashboard/
├── public/                   # Static assets
│   ├── logo.png             # App branding
│   └── manifest.json        # PWA manifest
├── src/
│   ├── assets/              # Images, logos, static files
│   ├── components/          # Reusable UI components
│   │   ├── Table/           # Custom table with sticky columns
│   │   ├── Popup/           # Modal components
│   │   └── Loading/         # Loading states
│   ├── layouts/             # Layout wrappers (Sidebar, Navbar)
│   ├── pages/               # Route components
│   │   ├── Login/           # Authentication pages
│   │   ├── super-admin/     # Super admin portal
│   │   ├── restaurant-admin/# Restaurant admin portal
│   │   └── restaurant-employee/ # Employee portal
│   ├── routes/              # Route configuration
│   ├── services/            # API layer
│   │   ├── modules/         # Feature-specific services
│   │   ├── endpoints.js     # API endpoint definitions
│   │   └── apiClient.js     # Axios instance with interceptors
│   ├── store/               # Redux configuration
│   │   └── slices/          # Redux slices (auth, etc.)
│   ├── App.jsx              # Root component
│   └── index.jsx            # Entry point
├── nginx/                   # Nginx configuration
├── docker-compose.yml       # Docker orchestration
├── dockerfile               # Container definition
└── guidelines.md            # Development best practices
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Docker & Docker Compose (for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd restaurant-ops-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # The .env file is already configured for localhost
   # Update the API_BASE_URL if you have a backend running
   ```

4. **Run development server**
   ```bash
   npm run start
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Docker Deployment

Build and run with HTTPS enabled:

```bash
docker compose up --build
```

Access at [https://localhost](https://localhost) (accept self-signed certificate warning)

**Stop the container:**
```bash
# Press Ctrl+C, then:
docker compose down
```

---

## 🎨 Design Highlights

### Component Library
- **Custom Table Component** with sticky columns, pagination, and action handlers
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Consistent Styling** using TailwindCSS utility classes and CSS variables
- **Loading States** with Suspense and lazy loading

### UI/UX Features
- Clean, professional interface with intuitive navigation
- Real-time form validation
- Toast notifications for user feedback
- Modal dialogs for complex workflows
- Accessible components with proper ARIA labels

---

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Backend validates and returns JWT token
3. Token stored in Redux store (persisted to localStorage)
4. All API requests include token in `x-access-token` header
5. Automatic logout on token expiration
6. Role-based portal routing

---

## 📊 Portal Features by Role

### Super Admin Portal
- Company onboarding approval/rejection
- User management across all companies
- Expense & Revenue overview for all restaurants
- System-wide analytics

### Restaurant Admin Portal
- Multi-location dashboard
- Employee management
- Expense & Revenue tracking across locations
- Blue Book P&L access
- Location management

### Restaurant Employee Portal
- Single-location view
- Expense reporting
- Revenue entry
- Blue Book viewing

---

## 📖 Development Guidelines

This project follows strict coding standards documented in `guidelines.md`:

- **Component Size**: Max 200 lines per JSX file
- **Styling**: TailwindCSS-first approach, CSS variables in `App.css`
- **Code Splitting**: React.lazy with Suspense for route-based splitting
- **Best Practices**: DRY principles, meaningful naming, clean code

---

## 🧪 Testing & Verification

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

### Manual Testing Checklist
- [ ] Login flow with different user roles
- [ ] Portal access restrictions
- [ ] Expense/Revenue CRUD operations
- [ ] User management features
- [ ] Responsive design on different screen sizes

---

## 🎯 Technical Highlights for Portfolio

This project demonstrates:

✅ **Advanced React Patterns**: Hooks, Context, Custom Hooks, Higher-Order Components  
✅ **State Management**: Redux Toolkit with complex async operations  
✅ **Authentication & Security**: JWT handling, protected routes, token refresh  
✅ **Multi-Tenancy**: Data isolation, role-based access, portal segregation  
✅ **Modern Build Tools**: Vite configuration, optimization strategies  
✅ **Containerization**: Docker multi-stage builds, Nginx configuration  
✅ **Code Quality**: ESLint integration, consistent code style, documentation  
✅ **Responsive Design**: Mobile-first approach with TailwindCSS  
✅ **API Architecture**: Service layer pattern, centralized endpoint management  

---

## 📝 Environment Variables

```bash
# .env
API_BASE_URL='http://localhost:8080/' # Your backend API URL
```

For production, update this to your deployed backend endpoint.

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or improvements
- Fork and experiment with new features
- Use as a reference for your own projects

---

## 📄 License

This project is available under the MIT License - feel free to use it for learning and portfolio purposes.

---

## 👨‍💻 About This Project

Built as a demonstration of full-stack SaaS development capabilities, this project showcases:
- Clean, maintainable code architecture
- Modern React development practices
- Enterprise-level application structure
- DevOps integration with Docker
- Production-ready deployment configuration

**Created by**: [Your Name]  
**GitHub**: [Your GitHub Profile]  
**Portfolio**: [Your Portfolio Website]

---

## 🔗 Related Projects

- Backend API (if applicable)
- Mobile App Version (if applicable)

---

**Note**: This is a demo application. Backend connections are simulated for portfolio demonstration purposes. For a fully functional deployment, connect to a compatible REST API backend.