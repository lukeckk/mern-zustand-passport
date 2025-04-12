# MERN E-commerce with DevOps Pipeline

A full-stack e-commerce application built with MERN stack (MongoDB, Express.js, React, Node.js) and modern DevOps practices.

## 🌐 Live Demo

[http://34.133.37.127/login](http://34.133.37.127/login)

### Test Credentials
```
Username: user
Password: user
```
Note: This is a demo account with regular user privileges. Admin access is restricted for database security.

## 🚀 Tech Stack

### Frontend
- React.js
- Zustand (State Management)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment Integration

### DevOps & Deployment
- Docker (Containerization)
- Kubernetes (Container Orchestration)
- GitHub Actions (CI/CD)
- Google Cloud Platform (GKE)

## 🔧 DevOps Pipeline

This project showcases a complete DevOps pipeline:

1. **Containerization**
   - Separate Dockerfiles for frontend and backend
   - Multi-stage builds for optimized images
   - Docker Compose for local development

2. **Container Registry**
   - Images pushed to Docker Hub
   - Automated tagging system
   - Frontend: `lukeecheng/mern-frontend`
   - Backend: `lukeecheng/mern-backend`

3. **Kubernetes Deployment**
   - GKE cluster configuration
   - Service and Deployment manifests
   - Environment variables and secrets management
   - Load balancer configuration

4. **CI/CD Pipeline**
   - Automated builds on push to main/master
   - GitHub Actions workflows
   - Automated testing and deployment
   - Zero-downtime deployments

## 🌟 Features

- User authentication with JWT
- State management with Zustand
- Secure payment processing with Stripe
- RESTful API architecture
- Role-based access control (Admin/User)
- Product catalog management
- Shopping cart functionality
- Containerized development environment
- Automated deployment pipeline
- Kubernetes orchestration
- Scalable infrastructure

## 🏃‍♂️ Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd mern-zustand-passport
   ```

2. **Environment Setup**
   ```bash
   # Backend (.env)
   cd backend
   cp envExample.txt .env
   # Update .env with your:
   # - MongoDB URI
   # - JWT secret
   # - Stripe secret key

   # Frontend (.env)
   cd ../frontend
   cp envExample.txt .env
   # Update .env with your backend URL
   ```

3. **Using Docker Compose (Recommended)**
   ```bash
   docker compose up
   ```
   Access:
   - Frontend: http://localhost:4173
   - Backend: http://localhost:5100

4. **Manual Setup**
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Frontend (new terminal)
   cd frontend
   npm install
   npm run dev
   ```

## 📝 License

[MIT License](LICENSE)