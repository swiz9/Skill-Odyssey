# Skill Odyssey 🧠🚀

> A modular learning management platform to create, share, track, and get notified about your learning journey.

---

## 📖 Description

Skill Odyssey is a full-stack application that empowers users to design personalized learning plans, share educational content, monitor progress, and receive timely reminders — all from one intuitive platform.

Built with modularity in mind, each core feature is split into maintainable submodules, enabling flexibility, scalability, and collaborative development.

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
---

## 🧰 Tech Stack

- **Backend:** Spring Boot, Java
- **Frontend:** React.js, JavaScript
- **Database:** MongoDB
- **Other Tools:** Maven, REST APIs

---

## ✨ Features

- 📚 **Learning Plan Sharing:** Build and distribute structured learning content.
- 📢 **Post Sharing:** Share educational posts with rich content and media.
- 🎯 **Progress Tracking:** View learning milestones and goals visually.
- 🔔 **Notifications:** Get alerted when a plan is about to expire.
- 👤 **User Management:** Register, authenticate, and manage users and roles.

---

## ⚙️ Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/skill-odyssey.git
cd skill-odyssey
```

### 2. Backend Setup

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Usage

1. Register a user or log in.
2. Create a new learning plan with a timeline and tags.
3. Upload images or media files to enhance your content.
4. Track your learning progress.
5. Receive automatic notifications when your plan is near expiry.
6. Share posts and discover learning material from other users.

---

## 🗂️ Folder Structure

```
skill-odyssey/
├──  backend
│   ├──  learning-plan-service (Maven module)
│   ├──  notification-service  
│   ├──  post-service
│   └──  user-service
│
└──  frontend
    ├──  lib (Shared components)
    ├──  learning-plans (Feature module)
    ├──  notifications
    └──  social-feed
```
# Backend .env
```bash
MONGO_URI=mongodb://localhost:27017/skill-odyssey
JWT_SECRET=your_secure_key_here
```
# Frontend .env
```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
```
---

## 📮 API Endpoints (Examples)

```
POST   /learningPlan
GET    /learningPlan
PUT    /learningPlan/{id}
DELETE /learningPlan/{id}
POST   /auth/register
POST   /auth/login
```

---

## 👥 Contributors

- **[Swiz9](https://github.com/Swiz9)** – Progress Tracking  
- **[Vihangait22902252](https://github.com/Vihangait22902252)** – Notification Management  
- **[Chamodi54](https://github.com/Chamodi54)** – Post Sharing  
- **[Tashika-Wijesooriya](https://github.com/Tashika-Wijesooriya)** – Learning Plan Sharing  
- **Team Skill Odyssey** – User Management




---

## 🏁 Get Started Now

Ready to level up your learning? Dive into **Skill Odyssey** and build the roadmap to your goals. 🌟
