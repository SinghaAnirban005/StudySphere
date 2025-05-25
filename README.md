# 📚 StudySphere

> A collaborative platform designed to revolutionize the way students learn together

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)

StudySphere is a modern, real-time collaborative learning platform that empowers students to create study groups, share resources, and collaborate seamlessly. Built with cutting-edge technologies and fully containerized for easy deployment.

## ✨ Features

### 🎯 Core Functionality
- **📝 Smart Study Groups**: Create subject-specific study groups with customizable settings
- **🔍 Intelligent Discovery**: Advanced search and filtering to find the perfect study groups
- **💬 Real-time Chat**: Instant messaging with typing indicators and message history
- **📁 Resource Hub**: Seamless sharing of documents, videos, articles, and study materials
- **🎨 Interactive Whiteboard**: Collaborative drawing and brainstorming with real-time synchronization
- **📄 PDF Export**: Export whiteboard sessions as high-quality PDFs for offline study

### 🚀 Technical Highlights
- **Real-time Collaboration**: Powered by Socket.io for instant synchronization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Scalable Architecture**: Microservices-ready with Docker containerization
- **State Management**: Redux for predictable state handling
- **Modern UI/UX**: Clean, intuitive interface designed for productivity

## 🏗️ Architecture

```
StudySphere/
├── client/StudySphere      # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components and helper functions
│   │   ├── store/         # State management
│   └── Dockerfile         # Frontend container config
├── server/src              # Node.js backend
│   ├── controllers/       # Business logic
│   ├── models/           # Database schemas
│   ├── db/               # Database connection setup
│   ├── routes/           # API endpoints
│   ├── utils/            # Helper wrappers
│   ├── middleware/       # Custom middleware
│   └── Dockerfile        # Backend container config
└── docker-compose.yml    # Multi-container orchestration
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **Socket.io Client** - Real-time communication
- **jsPDF** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.io** - WebSocket communication
- **JWT** - Authentication

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Production web server

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- MongoDB (if running without Docker)

### 🐳 Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/StudySphere.git
   cd StudySphere
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8000

### 💻 Local Development

1. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client/StudySphere
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Create .env file in server directory
   cp server/.env.example server/.env
   # Configure your MongoDB URI and other variables
   ```

3. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd server
   npm run dev

   # Terminal 2: Start frontend
   cd client/StudySphere
   npm run dev
   ```

## 🐳 Docker Configuration

### Frontend Dockerfile
Our multi-stage build optimizes the production image:
```dockerfile
FROM node:lts-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile
Lightweight Alpine-based container for the API:
```dockerfile
FROM node:lts-alpine3.21
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📋 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Video calling integration
- [ ] Advanced whiteboard tools
- [ ] AI-powered study recommendations
- [ ] Calendar integration
- [ ] Gamification features
- [ ] Multi-language support

## 🐛 Known Issues

- Whiteboard performance on large drawings
- File upload size limitations
- Mobile responsiveness improvements needed

## 👨‍💻 Authors

- **Anirban Singha** - *Initial work* - [YourGitHub](https://github.com/SinghaAnirban005)

## 📞 Support

- 📧 Email: anirbansingha20@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/SinghaAnirban005/StudySphere/issues)

---

<div align="center">
  <b>⭐ Star this repository if you found it helpful! ⭐</b>
</div>
