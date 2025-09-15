# LivSoul - Tech Stack Architecture

## 🏗️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 LIVSOUL PLATFORM                                 │
│                        Liver Cirrhosis Prediction System                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  FRONTEND LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🌐 React 18 Application                                                         │
│  ├── ⚡ Vite (Build Tool & Dev Server)                                           │
│  ├── 🎨 Framer Motion (Animations & Transitions)                                 │
│  ├── 🧭 React Router DOM (Navigation & Routing)                                  │
│  ├── 📡 Axios (HTTP Client & API Communication)                                  │
│  ├── 🎯 Context API (State Management)                                           │
│  ├── 💾 LocalStorage (Token Persistence)                                         │
│  └── 🎨 Custom CSS (Medical Theme & Responsive Design)                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│  📱 User Interface Components:                                                   │
│  ├── 🏠 HomePage - Landing & Information                                         │
│  ├── 🔐 Authentication - Login/Register Modals                                   │
│  ├── 🧠 Prediction Tool - ML Model Interface                                     │
│  ├── 📊 Statistics - Global Health Data                                          │
│  ├── 📚 Education - Medical Information                                          │
│  └── 👤 User Dashboard - Profile & History                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                   📡 HTTPS/REST API
                                        │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  BACKEND LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🟢 Node.js Runtime Environment                                                  │
│  ├── 🚀 Express.js Web Framework                                                 │
│  ├── 🔐 JWT Authentication (JSON Web Tokens)                                     │
│  ├── 🛡️ bcrypt Password Hashing                                                  │
│  ├── 🌐 CORS Cross-Origin Resource Sharing                                       │
│  ├── ⏱️ Rate Limiting & Security Middleware                                      │
│  └── 📝 Input Validation & Sanitization                                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🛣️ API Routes & Controllers:                                                    │
│  ├── 🔐 /api/auth/* - Authentication Endpoints                                   │
│  │   ├── POST /register - User Registration                                      │
│  │   ├── POST /login - User Login                                                │
│  │   ├── GET /profile - User Profile                                             │
│  │   └── PUT /profile - Update Profile                                           │
│  ├── 🧠 /api/predictions/* - ML Prediction Endpoints                             │
│  │   ├── POST /predict - Generate Prediction                                     │
│  │   ├── GET /history - User Prediction History                                  │
│  │   └── GET /stats - Prediction Statistics                                      │
│  └── 🩺 /api/health - System Health Check                                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                   🔗 Database Connection
                                        │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 DATABASE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🌐 MongoDB Atlas (Cloud Database)                                               │
│  ├── 🏗️ Mongoose ODM (Object Document Mapper)                                   │
│  ├── 📋 Schema Validation & Relationships                                        │
│  ├── 🔍 Indexing & Query Optimization                                            │
│  └── 🛡️ Built-in Security & Encryption                                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│  📊 Data Models & Collections:                                                   │
│  ├── 👤 Users Collection                                                         │
│  │   ├── User Authentication Data                                                │
│  │   ├── Profile Information                                                     │
│  │   ├── Role Management (Patient/Doctor/Admin)                                  │
│  │   └── Account Settings                                                        │
│  ├── 🧠 Predictions Collection                                                   │
│  │   ├── ML Model Results                                                        │
│  │   ├── Input Parameters                                                        │
│  │   ├── Prediction Confidence                                                   │
│  │   └── Timestamp & Metadata                                                    │
│  └── 📋 Medical Records Collection                                               │
│      ├── Patient History                                                         │
│      ├── Medical Parameters                                                      │
│      ├── Test Results                                                            │
│      └── Clinical Notes                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                   🧠 ML Integration
                                        │
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            MACHINE LEARNING LAYER                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🐍 Python ML Backend                                                            │
│  ├── 🧠 Scikit-learn (Machine Learning Library)                                  │
│  ├── 🐼 Pandas (Data Manipulation & Analysis)                                    │
│  ├── 🔢 NumPy (Numerical Computing)                                              │
│  └── 📊 Pickle (Model Serialization)                                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🎯 ML Components:                                                               │
│  ├── 📁 liver_cirrhosis_predictor.pkl - Trained Model                           │
│  ├── 📊 erg_liver_cirrhosis_dataset.xlsx - Training Data                        │
│  ├── 🔧 Feature Engineering & Preprocessing                                      │
│  ├── 🧮 Algorithm: [Classification Model]                                        │
│  ├── 📈 Model Validation & Accuracy Metrics                                      │
│  └── 🔄 Real-time Prediction Pipeline                                            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                               DEPLOYMENT & DEVOPS                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🔧 Development Tools:                                                           │
│  ├── 📦 NPM Package Management                                                   │
│  ├── 🔄 Git Version Control                                                      │
│  ├── 🐙 GitHub Repository Hosting                                                │
│  ├── 🔨 Vite Development Server                                                  │
│  └── 🧪 Hot Module Replacement                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🌐 Production Ready Features:                                                   │
│  ├── 🔐 Environment Variables (.env)                                             │
│  ├── 🚫 .gitignore Security                                                      │
│  ├── 📱 Responsive Design                                                        │
│  ├── ⚡ Performance Optimization                                                 │
│  ├── 🛡️ Security Best Practices                                                 │
│  └── 📊 Error Handling & Logging                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                SECURITY LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🔐 Authentication & Authorization:                                              │
│  ├── 🎫 JWT Token-based Authentication                                           │
│  ├── 🔒 bcrypt Password Encryption                                               │
│  ├── 👥 Role-based Access Control                                                │
│  ├── 🕐 Session Management                                                       │
│  └── 🔄 Token Refresh Mechanism                                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  🛡️ Data Protection:                                                            │
│  ├── 🌐 HTTPS Encryption                                                         │
│  ├── 🔍 Input Validation                                                         │
│  ├── 🚫 SQL Injection Prevention                                                 │
│  ├── 🔐 Environment Variable Security                                            │
│  ├── ⏱️ Rate Limiting                                                            │
│  └── 🛡️ CORS Protection                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

```

## 🔄 Data Flow Architecture

```
┌─────────────┐    📡 HTTPS     ┌─────────────┐    🔗 MongoDB    ┌─────────────┐
│   CLIENT    │ ───────────────►│   SERVER    │ ────────────────►│  DATABASE   │
│  (React)    │                 │ (Node.js)   │                  │ (MongoDB)   │
│             │◄─────────────── │             │◄──────────────── │             │
└─────────────┘    JSON/JWT     └─────────────┘    Documents     └─────────────┘
                                       │
                                   🧠 Python
                                       ▼
                                ┌─────────────┐
                                │  ML MODEL   │
                                │  (Pickle)   │
                                └─────────────┘
```

## 📊 Technology Stack Summary

| Layer | Technology | Purpose | Version |
|-------|------------|---------|---------|
| **Frontend** | React | UI Library | 18.x |
| | Vite | Build Tool | 4.x |
| | Framer Motion | Animations | Latest |
| | React Router | Navigation | 6.x |
| | Axios | HTTP Client | Latest |
| **Backend** | Node.js | Runtime | 18+ |
| | Express.js | Web Framework | 4.x |
| | JWT | Authentication | Latest |
| | bcrypt | Password Hash | Latest |
| **Database** | MongoDB Atlas | Cloud Database | 6.x |
| | Mongoose | ODM | 7.x |
| **ML** | Python | ML Backend | 3.8+ |
| | Scikit-learn | ML Library | Latest |
| | Pandas | Data Analysis | Latest |
| | NumPy | Numerical Computing | Latest |
| **DevOps** | Git | Version Control | Latest |
| | GitHub | Repository | - |
| | NPM | Package Manager | 9+ |

## 🎯 Key Features by Layer

### Frontend Features:
- ✅ Medical-themed responsive UI
- ✅ User authentication system
- ✅ Real-time predictions
- ✅ Smooth animations
- ✅ Mobile-first design

### Backend Features:
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling

### Database Features:
- ✅ Cloud-based MongoDB Atlas
- ✅ Schema validation
- ✅ Relationship management
- ✅ Query optimization
- ✅ Data security

### ML Features:
- ✅ Trained prediction model
- ✅ Real-time inference
- ✅ Feature preprocessing
- ✅ Confidence scoring
- ✅ Model persistence

This architecture ensures scalability, security, and maintainability for the LivSoul medical platform! 🏥✨