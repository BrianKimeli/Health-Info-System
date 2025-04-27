# 🏥 Health Information System

*A basic health information management system for client and program administration*

## ▶️ System Demo Video
[Watch Demo]


## 📌 Core Functionalities

### 1. Program Management
- Create/delete health programs (TB, Malaria, HIV etc.)
- View all available programs
- Program description and details

### 2. Client Operations
- Register new clients with:
  - Personal information
  - Contact details
- Search clients by name/ID
- View comprehensive client profiles

### 3. Enrollment System
- Enroll clients in multiple programs
- Track active enrollments

### 4. API Access
- RESTful endpoints for integration
- JSON responses for client data
- Secure authentication via JWT

## 🖥️ Key Screens

| Feature | Preview |
|---------|---------|
| **Login** | ![Login Screen](/client/public/images/login.png) |
| **Client Registration** | ![Registration](/client/public/images/clients.png) |
| **Program Dashboard** | ![Programs](/client/public/images/programs.png) |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Modern web browser

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/health-system.git

# Install dependencies
cd health-system
npm install

# Configure environment
cp .env.example .env