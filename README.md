# 🏥 Health Information System

*A basic health information management system for client and program administration*

## ▶️ System Demo Video
[Watch Demo](./client/public/Demo.mp4)
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
| **Clients Profile** | ![Programs](/client/public/images/clientsProfile.png) |

## Run Locally if vercel url is not communicating with backend

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB running locally (e.g. via `mongod` or Compass)

---

### 1. Start the Backend

cd server
npm install
 create a .env file with:
   MONGO_URI=mongodb://localhost:27017/health_info_system
npm run dev

# 2. Start the Frontend
cd ../client
npm install
create a .env file with:
  REACT_APP_BACKEND_URL=http://localhost:5000
- npm start
- Your React app will be available at http://localhost:3000.
